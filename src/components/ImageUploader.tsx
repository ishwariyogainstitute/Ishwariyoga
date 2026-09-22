import React, { useState } from 'react';
import { Upload, Trash2, Image as ImageIcon, Link as LinkIcon, CheckCircle2, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = 'e.g. https://images.unsplash.com/photo-...'
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    // 2MB safe limit for localStorage Base64 storage
    if (file.size > 2 * 1024 * 1024) {
      setError('Image file is too large (limit: 2MB). Please compress it or use an external URL to avoid storage limits.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (base64) {
        onChange(base64);
      }
    };
    reader.onerror = () => {
      setError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const isBase64 = value.startsWith('data:image/');

  return (
    <div className="space-y-2">
      <label className="block uppercase tracking-wider text-[10px] font-semibold text-espresso/70 mb-1">
        {label}
      </label>

      {/* Main Upload / Preview Area */}
      <div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-4 transition-all duration-200 ${
          dragActive 
            ? 'border-olive-green bg-warm-beige/30' 
            : value 
              ? 'border-biscuit/40 bg-warm-beige/5' 
              : 'border-biscuit/30 hover:border-olive-green/45 bg-warm-beige/10 hover:bg-warm-beige/15'
        }`}
      >
        {value ? (
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Image Preview Thumbnail */}
            <div className="relative w-24 h-24 rounded-md overflow-hidden border border-biscuit/30 shrink-0 bg-primary-white shadow-sm">
              <img 
                src={value} 
                alt="Preview" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1 right-1 bg-olive-green text-white p-0.5 rounded-full shadow">
                <CheckCircle2 size={12} />
              </div>
            </div>

            {/* Info and Actions */}
            <div className="flex-1 text-center sm:text-left space-y-2 w-full">
              <div>
                <p className="font-semibold text-espresso text-[11px] truncate max-w-xs">
                  {isBase64 ? 'Local Image (Stored Safely)' : 'External Image Link'}
                </p>
                <p className="text-[9px] text-espresso/50">
                  {isBase64 ? 'Compressed Base64 format' : value.substring(0, 45) + (value.length > 45 ? '...' : '')}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {/* Replace Button */}
                <label className="px-2.5 py-1.5 bg-primary-white border border-biscuit/30 hover:border-olive-green hover:text-olive-green rounded text-[10px] font-bold font-sans uppercase flex items-center gap-1 cursor-pointer transition-colors">
                  <Upload size={10} />
                  <span>Replace</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="hidden" 
                  />
                </label>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="px-2.5 py-1.5 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded border border-red-200 transition-colors text-[10px] font-bold font-sans uppercase flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 size={10} />
                  <span>Delete Image</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 space-y-2 group cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              id={id}
            />
            <div className="space-y-1">
              <Upload size={20} className="mx-auto text-olive-green group-hover:scale-110 transition-transform duration-200" />
              <p className="font-semibold text-espresso text-xs">
                Drag & drop or click to upload
              </p>
              <p className="text-[9px] text-espresso/50">
                Supports PNG, JPG, WEBP (Max size 2MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Manual URL Input Field (Fallback / Option 2) */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-espresso/40">
          <LinkIcon size={12} />
        </div>
        <input
          type="text"
          value={isBase64 ? '' : value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-7 pr-3 py-2 border border-biscuit/30 rounded bg-primary-white text-[11px] text-espresso focus:outline-none"
          placeholder={isBase64 ? 'Local Image is uploaded. Paste external URL here to override...' : placeholder}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex gap-1.5 items-center text-red-600 text-[10px] font-sans font-medium mt-1">
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
