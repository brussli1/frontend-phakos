<script lang="ts">
    import { onMount } from 'svelte';
    import { baseURL } from '@/config';

    interface CarouselItem {
        id: string;
        url: string;
        alt: string;
    }

    interface Product {
        id: number;
        attributes: {
            nombre: string;
            descripcion: string;
            precio: number;
            slug: string;
        };
    }

    let carouselItems: CarouselItem[] = [];
    let productos: Product[] = [];
    let popularProducts: Product[] = [];

    // Fetch Carousel Items
    onMount(async () => {
        try {
            const response = await fetch(`${baseURL}/api/carrusels?populate=*`);
            if (response.ok) {
                const data = await response.json();
                carouselItems = data.data[0].attributes.carrusel.data.map((item: any, index: number) => {
                    const imgData = item.attributes;
                    const imageUrl = imgData.url.startsWith('/') ? `${baseURL}${imgData.url}` : imgData.url;
                    const altText = imgData.alternativeText || `Carousel image ${index + 1}`;
                    return { id: `item${index + 1}`, url: imageUrl, alt: altText };
                }).filter(Boolean);
            } else {
                console.error('API fetch failed:', response.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });

    // Fetch "Lo Nuevo" Products
    onMount(async () => {
        try {
            const response = await fetch(`${baseURL}/api/lo-nuevos?populate=*`);
            if (response.ok) {
                const data = await response.json();
                productos = data.data[0].attributes.productos.data;
            } else {
                console.error('API fetch failed:', response.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });

    

// Fetch "Popular" Products
    onMount(async () => {
        // Previous fetch calls remain unchanged

        // New fetch call for "Popular" products
        try {
            const response = await fetch(`${baseURL}/api/populars?populate=*`);
            if (response.ok) {
                const data = await response.json();
                popularProducts = data.data[0].attributes.productos.data;
            } else {
                console.error('API fetch failed for popular products:', response.statusText);
            }
        } catch (error) {
            console.error('Fetch error for popular products:', error);
        }
    });
</script>

<div class="container mx-auto px-4">
    <nav class="bg-red-500 text-white p-4">
        <!-- Navigation content here -->
    </nav>

    <header class="my-5 text-center">
        <h1 class="text-3xl mb-5">Explora Nuestros Mejores Productos</h1>
        <div class="carousel w-full">
            {#each carouselItems as item (item.id)}
                <div id={item.id} class="carousel-item w-full">
                    <img src={item.url} class="responsive-img" alt={item.alt} />
                </div>
            {/each}
        </div>

        <div class="flex justify-center w-full h-12 py-2 gap-2">
            {#each carouselItems as item (item.id)}
                <a href={`#${item.id}`} class="btn btn-xs">{item.id.replace('item', '')}</a>
            {/each}
        </div>
    </header>

    <!-- "Lo Nuevo" Products Section -->
    {#if productos.length > 0}
        <div class="my-10">
            <h1 class="text-4xl font-bold text-center">Lo Nuevo</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {#each productos as producto}
                    <div class="card bg-base-100 shadow-xl">
                        <figure class="h-96 bg-gray-200">
                            <img src="/default-placeholder.png" alt={producto.attributes.nombre} class="object-cover h-full w-full" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title text-2xl font-bold">{producto.attributes.nombre}</h2>
                            <p class="my-4">{producto.attributes.descripcion}</p>
                            <span class="text-lg font-bold">${producto.attributes.precio}</span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {:else}
        <p class="text-center">Loading...</p>
    {/if}

        <!-- "Popular" Products Section -->
    {#if popularProducts.length > 0}
    <div class="container mx-auto my-10">
        <h1 class="text-4xl font-bold text-center">Popular</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {#each popularProducts as producto}
                <div class="card bg-base-100 shadow-xl">
                    <figure class="h-96 bg-gray-200">
                        <!-- Placeholder image; adjust as needed based on your data structure -->
                        <img src="/default-placeholder.png" alt={producto.attributes.nombre} class="object-cover h-full w-full" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title text-2xl font-bold">{producto.attributes.nombre}</h2>
                        <p class="my-4">{producto.attributes.descripcion}</p>
                        <span class="text-lg font-bold">${producto.attributes.precio}</span>
                        <!-- Additional product details as needed -->
                    </div>
                </div>
            {/each}
        </div>
    </div>
    {:else}
    <p class="text-center">Loading popular products...</p>
    {/if}


    <footer class="bg-red-500 text-white p-4 text-center mt-10">
        <!-- Footer content here -->
    </footer>
</div>

<style>
    .responsive-img {
        width: 100%;
        max-height: 400px; /* Adjust this value as needed */
        object-fit: cover;
    }
</style>
