import { getImageSize } from 'react-image-size'

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const allImages = async () => {
  try {
    const res = await fetch(`${SERVER_URL}/image/all`);
    const json = await res.json();
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

const imageSaved = async (userId, imageId) => {
  const body = {
    userId,
    imageId
  }
  try {
    const res = await fetch(`${SERVER_URL}/image/saved`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const json = await res.json();
    return json.data;
  } catch (error) {
    throw new Error(error);
  }
};

const uploadImaged = async (formData, url, token) => {
  try {
    formData = { ...formData, url }
    const res = await fetch(`${SERVER_URL}/image/upload-image`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error(error)
  }
}

const imageDetail = async (imageId) => {
  try {
    const res = await fetch(`${SERVER_URL}/image/${imageId}`)
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error(error)
  }
}

const fetchImageSize = async (imgURL) => {
  try {
    const dimensions = await getImageSize(imgURL);
    return dimensions
  } catch (error) {
    throw new Error(error)
  }
}

const formatCreatedDate = (createAt) => {
  if (!createAt) return ''
  const date = createAt.split("T")[0]
  return new Date(date).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const formatShortCreatedDate = (createAt) => {
  if (!createAt) return ''

  const date = createAt.split("T")[0]
  return new Date(date).toLocaleDateString("en-us", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

const addComment = async (imageId, formData, token) => {
  try {
    const res = await fetch(`${SERVER_URL}/image/${imageId}/comments`, {
      method: 'put',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error(error)
  }
}

const getImagesByCategory = async (category) => {
  try {

    const res = await fetch(`${SERVER_URL}/image/category/${category}`)
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error(error)
  }
}

export { allImages, imageSaved, uploadImaged, imageDetail, fetchImageSize, formatCreatedDate, addComment, getImagesByCategory, formatShortCreatedDate };
