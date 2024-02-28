<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores'; // Import to access URL parameters
    import { baseURL } from '@/config';
  
    interface Foto {
    data: {
      attributes: {
        url: string;
      };
    }[] | null; // Indicate that data can be null
  }

  interface Producto {
    id: number;
    attributes: {
      nombre: string;
      descripcion: string;
      precio: number;
      slug: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      foto: Foto;
    };
  }

  interface Marca {
    id: number;
    attributes: {
      Nombre: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      productos: {
        data: Producto[];
      };
    };
    imageUrl?: string; // Add this line to include the imageUrl in the interface
  }
  
    let marca: Marca[] = [];
  
    $: slug = $page.params.slug; // Reactively get the slug from the page URL
  
    onMount(async () => {
      try {
        const response = await fetch(`${baseURL}/api/marcas?filters[slug]=${slug}&populate[productos][populate]=foto`);
        if (response.ok) {
        const data = await response.json();
        marca = data.data.map((marca: any) => {
          // Default image URL if no product image is available
          const defaultImageUrl = '/default-placeholder.png';
          // Check for the first product with a non-null foto.data and use its first image, or use the default image URL
          const firstProductImage = marca.attributes.productos.data.find((p: Producto) => p.attributes.foto && p.attributes.foto.data && p.attributes.foto.data.length > 0)?.attributes.foto.data[0].attributes.url;
          return {
            ...marca,
            imageUrl: firstProductImage ? `${baseURL}${firstProductImage}` : defaultImageUrl,
          };
        });
      } else {
        console.error('API fetch failed:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  });
  </script>

{#if marca && marca.length > 0}
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold text-left my-10">{marca[0].attributes.Nombre}</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each marca[0].attributes.productos.data as producto}
        <div class="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <figure class="h-48 bg-gray-200">
                {#if producto.attributes.foto.data && producto.attributes.foto.data.length > 0}
                <img src={`${baseURL}${producto.attributes.foto.data[0].attributes.url}`} alt={producto.attributes.nombre} class="object-cover h-full w-full" />
                {:else}
                <img src="/default-placeholder.png" alt="Placeholder image" class="object-cover h-full w-full" />
                {/if}
            </figure>          
        <div class="card-body">
                <h2 class="card-title text-base md:text-lg font-bold">{producto.attributes.nombre}</h2>
            <div class="flex flex-wrap justify-between items-center mt-4 gap-2"></div>
                    <span class="text-lg font-bold">Precio: ₲{producto.attributes.precio}</span>
                    <a href={`/productos/${producto.attributes.slug}`} class="btn btn-primary text-xs md:text-base px-2 md:px-4 py-1 md:py-2">Ver Más</a>
            </div>
        </div>
            {/each}  
        </div>
    </div>     
{:else}
  <p>No data found for this slug.</p>
{/if}


  