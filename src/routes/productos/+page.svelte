<script lang="ts">
    import { onMount } from 'svelte';
    // Correct the import path to be relative
    import { baseURL } from '@/config'; // Adjust the path as necessary
    
    // Define a TypeScript interface for the product
    interface Product {
      attributes: {
        nombre: string;
        precio: number;
        slug: string;
        foto: {
          data: {
              attributes: {
                url: string;
              };
          } [] |  null;
        };
      };
       imageUrl?: string;
    }
    let productos: Product[] = [];
    
    onMount(async () => {
        try {
            const response = await fetch(`${baseURL}/api/productos?populate=*`);
            if (response.ok) {
                const data = await response.json();
                productos = data.data.map((producto: Product) => ({
                    ...producto,
                    imageUrl: producto.attributes.foto.data && producto.attributes.foto.data.length > 0
                        ? `${baseURL}${producto.attributes.foto.data[0].attributes.url}`
                        : 'default-placeholder.png' // Directly assign a default image
                }));
            } else {
                console.error('API fetch failed:', response.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });
  </script>
    
    
    
    <!-- Products Section -->
    <div class="container px-4 mx-auto">
        <h1 class="text-4xl font-bold text-center my-10">Tienda</h1>
        <h2 class="text-2xl font-bold mb-6">Productos</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each productos as producto}
                <!-- Use rel="prefetch" for SvelteKit prefetching -->
                <a href={`/productos/${producto.attributes.slug}`} class="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300" rel="prefetch">
                    <figure class="h-48 bg-gray-200">
                        <!-- Apply lazy loading for images -->
                        <img src={producto.imageUrl} alt={producto.attributes.nombre} class="object-cover h-full w-full" loading="lazy" />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title">{producto.attributes.nombre}</h3>
                        <div class="flex justify-between items-center mt-4">
                            <span class="text-lg font-bold">${producto.attributes.precio}</span>
                            <button class="btn btn-primary">Contactar</button>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    </div>
  
  <style>
    /* Custom styles if needed */
  </style>
  