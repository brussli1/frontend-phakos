<script lang="ts">
  import { onMount } from 'svelte';
  import { baseURL } from '@/config';

  interface Foto {
    data: {
      attributes: {
        url: string;
      };
    }[] | null;
  }

  interface Product {
    id: number;
    attributes: {
      nombre: string;
      descripcion: string;
      precio: number;
      slug: string;
      foto?: Foto; // Ensure this matches your actual API structure
    };
    imageUrl?: string; // Include imageUrl here for easier access in the template
  }

  let lonuevo: Product[] = [];

  onMount(async () => {
    try {
      const response = await fetch(`${baseURL}/api/lo-nuevos?populate[productos][populate]=foto`);
      if (response.ok) {
        const data = await response.json();
        lonuevo = data.data[0].attributes.productos.data.map((producto: Product) => {
          const defaultImageUrl = '/default-placeholder.png';
          const imageUrl = producto.attributes.foto?.data?.[0]?.attributes.url ? `${baseURL}${producto.attributes.foto.data[0].attributes.url}` : defaultImageUrl;
          return { ...producto, imageUrl }; // Simplified imageUrl assignment
        });
      } else {
        console.error('API fetch failed:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  });
</script>

{#if lonuevo.length > 0}
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold text-left my-10">Lo Nuevo</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each lonuevo as producto}
        <div class="card bg-base-100 shadow-xl">
          <figure class="h-48 bg-gray-200">
            <img src={producto.imageUrl} alt={producto.attributes.nombre} class="object-cover h-full w-full" loading="lazy" />
          </figure>
          <div class="card-body">
            <h2 class="card-title text-2xl font-bold">{producto.attributes.nombre}</h2>
            <p class="my-4">{producto.attributes.descripcion}</p>
            <span class="text-lg font-bold">Precio: ${producto.attributes.precio}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}
