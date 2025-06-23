import supabase, { supabaseUrl } from './supabase';

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'member',
        fullName,
        avatar: '',
      },
    },
  });

  if (error) throw new Error('Signup error', error);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error('Login error', error.message);

  return data;
}

export async function getCurrentUser() {
  // 取得目前的 session
  // 如果有登入，會拿到 session 的資訊
  // 如果沒登入，session 會是 null
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) throw new Error('getSession Error', sessionError);

  if (!session?.session) return null; // session 無效，代表未登入，回傳 null

  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) throw new Error('getUser Error', userError);

  return user?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error('Logout Error', error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. 更新用戶名稱或密碼
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error: updateError } = await supabase.auth.updateUser(
    updateData
  );

  if (updateError)
    throw new Error('更新用戶名稱或更新密碼錯誤', updateError.message);

  // 檢查是否需要上傳 Avatar
  if (!avatar) return data;

  // 2. 上傳圖片到資料庫
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError)
    throw new Error('Upload avatar Error', storageError.message);

  // 3. 更新資料庫的圖片url
  const { data: updatedUser, error: updateError2 } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateError2)
    throw new Error('Update avatar url Error', updateError2.message);

  return updatedUser;
}
