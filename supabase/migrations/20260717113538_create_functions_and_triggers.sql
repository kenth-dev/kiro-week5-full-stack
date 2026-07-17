-- Auto-create an empty profile when a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Server-side challenge validation + idempotent stamp unlock.
-- The client never sees correct_answer; it only sends its chosen index here.
create or replace function public.unlock_craft(p_craft_id uuid, p_answer integer)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := (select auth.uid());
  v_correct integer;
  v_stamp_name text;
  v_newly_unlocked boolean := false;
begin
  if v_user is null then
    return jsonb_build_object('ok', false, 'reason', 'unauthenticated');
  end if;

  select correct_answer, stamp_name
    into v_correct, v_stamp_name
  from public.crafts
  where id = p_craft_id;

  if not found then
    return jsonb_build_object('ok', false, 'reason', 'not_found');
  end if;

  if p_answer is distinct from v_correct then
    return jsonb_build_object('ok', false, 'reason', 'incorrect');
  end if;

  insert into public.user_progress (user_id, craft_id)
  values (v_user, p_craft_id)
  on conflict (user_id, craft_id) do nothing;

  get diagnostics v_newly_unlocked = row_count;

  return jsonb_build_object(
    'ok', true,
    'stamp_name', v_stamp_name,
    'newly_unlocked', v_newly_unlocked > 0
  );
end;
$$;

revoke execute on function public.unlock_craft(uuid, integer) from anon, public;
grant execute on function public.unlock_craft(uuid, integer) to authenticated;
