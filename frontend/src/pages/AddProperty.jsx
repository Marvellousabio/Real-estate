import React, { useState ,useEffect} from "react";
import { createProperty } from "../services/api";



export default function AddProperty() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    category: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    images:[],
  });

  const [files, setFiles] = useState([]);
  const [uploading,setUploading]=useState(false);
  const [isDragging, setIsDragging] = useState(false);

   const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange =(e)=>{
    const newFiles= Array.from(e.target.files).filter((file)=>{
     const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!validTypes.includes(file.type)) {
      alert('Only PNG and JPG files are allowed.');
      return false;
    }
    if (file.size > maxSize) {
      alert('File size exceeds 5MB.');
      return false;
    }
    return true; 
    });
    setFiles(prevFiles=> {
      {/* for update later 
        const filteredNewFiles = newFiles.filter(
      file => !prevFiles.some(f => f.name === file.name && f.lastModified === file.lastModified)
    ); 
        */}
      const combined= [...prevFiles, ...newFiles];
      return combined.slice(0,5);
    }); 
    
  };
  const handleDrop = (e)=>{
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles= Array.from(e.dataTransfer.files).slice(0,5);
     setFiles(prevFiles => {
      {/* for update later 
        const filteredNewFiles = newFiles.filter(
      file => !prevFiles.some(f => f.name === file.name && f.lastModified === file.lastModified)
    ); 
        */}
    const combined = [...prevFiles, ...droppedFiles];
    return combined.slice(0, 5); // limit total to 5 files
  });
  };

  const handleDragOver = (e)=> e.preventDefault();
  const handleDragEnter =()=> setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);

  const uploadImages=async()=>{
    setUploading(true);
    const urls=[];
    try {
      for(let file of files){
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", UPLOAD_PRESET);
  
        const res= await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {method: "POST", body:data}
        );

        if (!res.ok) throw new Error(`Upload failed for ${file.name}`);
      const result = await res.json();
      if (result.error) throw new Error(result.error.message);
      urls.push(result.secure_url);
      }
      } catch (err) {
    alert(`Image upload failed: ${err.message}`);
    setUploading(false);
    return [];
  }
      setUploading(false);
      return urls;
    };

    useEffect(() => {
  return () => {
    files.forEach((file) => URL.revokeObjectURL(file));
  };
}, [files]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrls = await uploadImages();
      const payload = {
      ...formData,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      size: Number(formData.size),
      images: imageUrls,
    };

      const res = await createProperty(payload);
      alert("✅ Property added successfully!");
      console.log(res.data);

      setFormData({
        title: "",
        description: "",
        type: "",
        category: "",
        location: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        size: "",
        images:[],
      });
      setFiles([]);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };


  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Add New Property
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter property title"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-600"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter property location"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-600"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-600"
          />
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Bedrooms</label>
            <input
              name="bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="No. of bedrooms"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Bathrooms</label>
            <input
              name="bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="No. of bathrooms"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>

        {/* Size */}
        <div>
          <label className="block text-gray-700 mb-2">Size (sqft)</label>
          <input
            name="size"
            type="number"
            value={formData.size}
            onChange={handleChange}
            placeholder="Enter size in sqft"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter property description"
            className="w-full p-3 border rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-green-600"
          ></textarea>
        </div>

         {/* Image Upload */}
        {/* Image Upload */}
<div >
  <label className="block text-gray-700 mb-2 font-medium">
    Upload Images (max 5)
  </label>

  <div
  onDrop={handleDrop}
  onDragOver={handleDragOver}
  onDragEnter={handleDragEnter}
  onDragLeave={handleDragLeave}
  className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl p-6 cursor-pointer transition ${
    isDragging ? "border-green-600 bg-green-50" : "border-green-300"}`
  }>
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={handleFileChange}
      className="hidden"
      id="imageUpload"
    />
    <label
      htmlFor="imageUpload"
      className="flex flex-col items-center cursor-pointer"
    >
      <svg
        className="w-10 h-10 text-gray-400 mb-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6H17a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <span className="text-gray-600">
        Click to <span className="text-green-600 font-semibold">Upload</span> or drag & drop
      </span>
      <span className="text-sm text-gray-400">PNG, JPG up to 5 files</span>
    </label>
  </div>

  {/* Preview */}
  {files.length > 0 && (
    <div className="grid grid-cols-5 sm:grid-cols-3 gap-2 mt-4">
      {files.map((file, idx) => (
        <img
          key={idx}
          src={URL.createObjectURL(file)}
          alt="preview"
          className="h-24 w-full object-cover rounded-lg shadow"
        />
      ))}
    </div>
  )}
</div>


        {/* Submit Button */}
        <button
          type="submit"
          disabled = {uploading}
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
        >
          {uploading ? "Uploading..." : "Add Property"}
        </button>
      </form>
    </div>
  );
}
