import { notFound } from 'next/navigation'
import { getProductBySlug, products } from '@/lib/products'
import ProductClient from './ProductClient'

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)
    .map(p => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        image: p.image,
        rating: p.rating,
        price: p.price,
        originalPrice: p.originalPrice
    }))

  return <ProductClient product={product} relatedProducts={relatedProducts} />
}
