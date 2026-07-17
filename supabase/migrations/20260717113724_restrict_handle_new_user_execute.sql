-- handle_new_user is only invoked by the on_auth_user_created trigger.
-- It must not be callable via the REST API.
revoke execute on function public.handle_new_user() from anon, authenticated, public;
