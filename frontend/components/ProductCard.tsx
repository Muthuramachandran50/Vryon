'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
    id: string;
    name: string;
    price: string;
    image: string;
    onTryOn: (id: string, image: string) => void;
}

export default function ProductCard({ id, name, price, image, onTryOn }: ProductCardProps) {
    const router = useRouter();

    return (
        <div className="glass-panel max-w-sm rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative h-96 w-full cursor-pointer group" onClick={() => router.push(`/product/${id}`)}>
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="group-hover:scale-110 transition-transform duration-500 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white border border-white px-6 py-2 rounded-full backdrop-blur-sm">View Details</span>
                </div>
            </div>
            <div className="p-5">
                <Link href={`/product/${id}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{name}</h5>
                </Link>
                <p className="mb-3 font-normal text-gray-300">${price}</p>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onTryOn(id, image);
                    }}
                    className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 w-full justify-center hover:from-purple-700 hover:to-blue-600 transition-all shadow-lg shadow-purple-500/30"
                >
                    Virtual Try-On
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
