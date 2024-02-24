<script lang="ts">
  import { onMount } from 'svelte';
  import { baseURL } from '@/config';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';

  // Define TypeScript interfaces for product attributes
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

  // Define TypeScript interface for product
  interface Product {
    attributes: ProductAttributes;
  }

  // Initialize variables
  let productos: Product[] = [];
  let marcaSlug: string | null = null;

  // Get the marca slug from the page store
  $: marcaSlug = get(page).params.slug;

  // Fetch products under the specified marca slug
  onMount(async () => {
    // Only proceed if `marcaSlug` is not null.
    if (marcaSlug !== null) {
      try {
        const response = await fetch(`${baseURL}/api/marcas?filters[slug]=${encodeURIComponent(marcaSlug)}&populate=productos`);
        if (response.ok) {
          const data = await response.json();
          const marca = data.data[0];
          if (marca && marca.attributes.productos) {
            productos = marca.attributes.productos.data;
          }
        } else {
          console.error('API fetch failed:', response.statusText);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    } else {
      console.error('Marca slug is null, cannot fetch products.');
    }
  });
</script>

{#if productos.length > 0}
<div class="container mx-auto">
  <h1 class="text-4xl font-bold text-center my-10">Productos de Marca</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each productos as producto}
    <div class="card bg-base-100 shadow-xl">
      <figure class="h-96 bg-gray-200">
        {#if producto.attributes.foto.data && producto.attributes.foto.data.length > 0}
        <img src={`${baseURL}${producto.attributes.foto.data[0].attributes.url}`} alt={producto.attributes.nombre} class="object-cover h-full w-full" />
        {:else}
        <img src="default-placeholder.png" alt="Placeholder" class="object-cover h-full w-full" />
        {/if}
      </figure>
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold">{producto.attributes.nombre}</h2>
        <p class="my-4">{producto.attributes.descripcion}</p>
        <span class="text-lg font-bold">${producto.attributes.precio}</span>
        <!-- Add more product details here -->
      </div>
    </div>
    {/each}
  </div>
</div>
{:else}
<p>No hay productos disponibles para esta marca.</p>
{/if}

<style>
/* Custom styles if needed */
</style>
