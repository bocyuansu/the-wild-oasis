import { useUser } from './useUser';

function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;

  return (
    <div className="flex gap-3 items-center font-medium text-sm text-grey-600">
      <img
        className="block w-9 aspect-square object-cover object-center rounded-full outline-2 outline-grey-100"
        src={avatar || 'default-user.jpg'}
        alt="avatar"
      />
      <span>{fullName}</span>
    </div>
  );
}

export default UserAvatar;
