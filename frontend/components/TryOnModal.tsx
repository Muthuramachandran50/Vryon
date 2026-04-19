'use client';
import { useState, useRef } from 'react';
import { tryOnProduct } from '@/lib/api';

interface TryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  productImage: string;
}

export default function TryOnModal({ isOpen, onClose, productImage }: TryOnModalProps) {
  const [personImage, setPersonImage] = useState<File | null>(null);
  const [personPreview, setPersonPreview] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPersonImage(file);
      setPersonPreview(URL.createObjectURL(file));
      setResultImage(null);
    }
  };

  const handleGenerate = async () => {
    if (!personImage) return;
    setLoading(true);
    try {
      const resultUrl = await tryOnProduct(personImage, productImage);
      console.log('Generated Result URL:', resultUrl);
      setResultImage(resultUrl);
    } catch (error) {
      console.error(error);
      alert('Failed to generate try-on result. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPersonImage(null);
    setPersonPreview(null);
    setResultImage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#f5f3f0] flex items-center justify-center hover:bg-[#e5e1db] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* ---- Left: Controls ---- */}
        <div className="w-full md:w-1/2 p-8 border-r border-[#e5e1db] flex flex-col gap-5 overflow-y-auto">
          <div>
            <p className="section-label mb-1">Virtual Try-On</p>
            <h2 className="text-2xl font-black tracking-tight text-[#0d0d0d]">Your Fitting Room</h2>
          </div>

          {/* Selected Garment */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6b7280] mb-2">Selected Garment</p>
            <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-[#f5f3f0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={productImage} alt="Selected garment" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* User Photo Upload */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6b7280] mb-2">Your Photo</p>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative h-64 w-full rounded-2xl border-2 border-dashed border-[#e5e1db] hover:border-[#0d0d0d] cursor-pointer flex items-center justify-center transition-colors bg-[#f9f8f7] overflow-hidden"
            >
              {personPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={personPreview} alt="Your photo" className="w-full h-full object-contain" />
              ) : (
                <div className="text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-[#e5e1db] flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-[#0d0d0d]">Click to upload photo</p>
                  <p className="text-xs text-[#6b7280] mt-1">Full body · Plain background works best</p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!personImage || loading}
            className={`w-full py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all ${
              !personImage || loading
                ? 'bg-[#e5e1db] text-[#6b7280] cursor-not-allowed'
                : 'bg-[#0d0d0d] text-white hover:opacity-85'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating... (~30s)
              </span>
            ) : '✦  Try On Now'}
          </button>

          <p className="text-xs text-[#6b7280] text-center">
            Powered by IDM-VTON · AI may take 20–40s
          </p>
        </div>

        {/* ---- Right: Result ---- */}
        <div className="w-full md:w-1/2 p-8 bg-[#f9f8f7] flex flex-col items-center justify-center min-h-[400px]">
          {resultImage ? (
            <div className="relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden border border-[#e5e1db] bg-white shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resultImage} alt="Try-On Result" className="w-full h-full object-contain" />
              <div className="absolute bottom-4 right-4">
                <a
                  href={resultImage}
                  download="vryon-tryon.png"
                  className="btn-primary py-2 px-5 text-xs"
                >
                  ↓ Download
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-[#e5e1db] flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-bold text-sm text-[#0d0d0d]">Result will appear here</p>
              <p className="text-xs text-[#6b7280] mt-1">Upload your photo and hit Try On Now</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
