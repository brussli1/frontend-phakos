<script lang="ts">
    import { onMount } from 'svelte';
    // Removed .ts extension from import path
    import { baseURL } from '@/config';
    import { page } from '$app/stores';
    import { get } from 'svelte/store';
  
    // Define TypeScript interface for product
    interface ProductAttributes {
      nombre: string;
      descripcion: string;
      precio: number;
      foto: {
        data: {
          attributes: {
            url: string;
          };
        }[] | null;
      };
    }
  
    interface Product {
      attributes: ProductAttributes;
    }
  
    let producto: Product | null = null;
    let slug: string | null = null;
  
    $: slug = get(page).params.slug;
  
    onMount(async () => {
    // Only proceed if `slug` is not null.
    if (slug !== null) {
        try {
        const response = await fetch(`${baseURL}/api/productos?filters[slug]=${encodeURIComponent(slug)}&populate=*`);
        if (response.ok) {
            const data = await response.json();
            producto = data.data[0];
        } else {
            console.error('API fetch failed:', response.statusText);
        }
        } catch (error) {
        console.error('Fetch error:', error);
        }
    } else {
        console.error('Slug is null, cannot fetch product details.');
    }
    });

  </script>
  
  {#if producto}
    <div class="container mx-auto">
      <h1 class="text-4xl font-bold text-center my-10">{producto.attributes.nombre}</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card bg-base-100 shadow-xl">
          <figure class="h-96 bg-gray-200">
            {#if producto.attributes.foto.data && producto.attributes.foto.data.length > 0}
              <img src={`${baseURL}${producto.attributes.foto.data[0].attributes.url}`} alt={producto.attributes.nombre} class="object-cover h-full w-full" />
            {:else}
              <img src="default-placeholder.png" alt="Placeholder" class="object-cover h-full w-full" />
            {/if}
          </figure>
        </div>
        
        <div class="card-body">
          <h2 class="card-title text-2xl font-bold">{producto.attributes.nombre}</h2>
          <p class="my-4">{producto.attributes.descripcion}</p>
          <span class="text-lg font-bold">${producto.attributes.precio}</span>
          <!-- Add more product details here -->
        </div>
      </div>
    </div>
  {:else}
    <p>Loading...</p>
  {/if}
  
  <style>
    /* Custom styles if needed */
  </style>
  