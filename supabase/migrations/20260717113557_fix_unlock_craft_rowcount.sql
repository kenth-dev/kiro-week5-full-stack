-- Fix: newly_unlocked must be derived from an integer row_count.
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
  v_rows integer := 0;
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

  get diagnostics v_rows = row_count;

  return jsonb_build_object(
    'ok', true,
    'stamp_name', v_stamp_name,
    'newly_unlocked', v_rows > 0
  );
end;
$$;
