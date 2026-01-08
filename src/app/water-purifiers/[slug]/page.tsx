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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'SV Water Solutions'
    },
    offers: {
      '@type': 'Offer',
      url: `https://svwatersolutions.com/water-purifiers/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'SV Water Solutions'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClient product={product} />
    </>
  )
}
