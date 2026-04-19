'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import TryOnModal from '@/components/TryOnModal';
import Image from 'next/image';

// Mock Data (duplicated for MVP - in real app would assume API fetch)
const PRODUCTS: Record<string, any> = {
    '1': {
        id: '1',
        name: 'Elegant Evening Gown',
        price: '129.99',
        description: 'A stunning floor-length gown perfect for formal occasions.',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2883&auto=format&fit=crop',
    },
    '2': {
        id: '2',
        name: 'Classic White Men\'s Shirt',
        price: '89.50',
        description: 'A timeless classic white shirt.',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2960&auto=format&fit=crop',
    },
    '3': {
        id: '3',
        name: 'Black Men\'s Tee',
        price: '45.00',
        description: 'Essential black t-shirt.',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2787&auto=format&fit=crop',
    },
    '4': {
        id: '4',
        name: 'Evening Silk Gown',
        price: '150.00',
        description: 'Luxurious silk gown.',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2548&auto=format&fit=crop',
    }
};

export default function ProductPage() {
    const params = useParams();
    const id = params.id as string;
    const product = PRODUCTS[id];
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!product) return <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">Product Not Found</div>;

    return (
        <main className="min-h-screen bg-[#0f172a] text-white">
            <Navbar />

            <div className="container mx-auto px-4 py-24 min-h-screen flex items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                    {/* Image Section */}
                    <div className="relative h-[600px] rounded-2xl overflow-hidden glass-panel">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Info Section */}
                    <div className="flex flex-col justify-center space-y-8 p-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                                {product.name}
                            </h1>
                            <p className="text-3xl text-gray-200 font-light">${product.price}</p>
                        </div>

                        <p className="text-gray-400 text-lg leading-relaxed">
                            {product.description}
                        </p>

                        <div className="space-y-4 pt-8">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all transform hover:-translate-y-1"
                            >
                                Virtual Try-On
                            </button>
                            <button className="w-full md:w-auto px-12 py-4 border border-gray-600 rounded-full font-bold text-lg hover:bg-white/10 transition-colors ml-0 md:ml-4">
                                Add to Cart
                            </button>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500 pt-8 border-t border-gray-800">
                            <span className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                In Stock
                            </span>
                            <span className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                Fast Shipping
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <TryOnModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productImage={product.image}
            />
        </main>
    );
}
