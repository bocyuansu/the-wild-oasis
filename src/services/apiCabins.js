import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('客房資料無法讀取');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // image 可能是 FileList (Create、Edit) 或 imageUrl (Edit)
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${(Math.random() * 1000000).toFixed()}-${
    newCabin.image.name
  }`.replaceAll('/', '');

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create / Edit Cabin
  let query = supabase.from('cabins');

  // A) CREATE
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // B) EDIT
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('無法編輯或新增客房');
  }

  // 2. 上傳圖片
  if (hasImagePath) return data; // 防止圖片重複上傳

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. 如果上傳圖片發生錯誤，則刪除這筆資料
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error('無法上傳圖片，未建立客房');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('客房無法刪除');
  }

  return data;
}
