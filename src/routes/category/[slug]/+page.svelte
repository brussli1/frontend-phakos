<script lang="ts">
  import { onMount } from 'svelte';
  import { baseURL } from '@/config'; // Adjust according to your setup
  import { page } from '$app/stores';
  import { get } from 'svelte/store';

  interface Product {
    id: number;
    attributes: {
      nombre: string;
      descripcion: string;
      precio: number;
      slug: string;
    };
  }

  interface Category {
    id: number;
    attributes: {
      categoria: string;
      slug: string;
      productos: {
        data: Product[];
      };
    };
  }

  let category: Category | null = null;
  let slug: string | null = null;

  // Reactive declaration to update content based on slug changes
  $: slug = get(page).params.slug, fetchCategory(slug);

  async function fetchCategory(slug: string | null) {
    if (!slug) return;
    try {
      const response = await fetch(`${baseURL}/api/categorias?filters[slug]=${encodeURIComponent(slug)}&populate=productos`);
      if (response.ok) {
        const data = await response.json();
        category = data.data[0]; // Assuming the API returns the category as the first item in an array
      } else {
        console.error('API fetch failed:', response.statusText);
        category = null;
      }
    } catch (error) {
      console.error('Fetch error:', error);
      category = null;
    }
  }

  // Initial fetch
  onMount(() => {
    fetchCategory(slug);
  });
</script>
 {#if category}
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold text-center my-10">{category.attributes.categoria}</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each category.attributes.productos.data as product}
        <div class="card bg-base-100 shadow-xl">
          <figure class="h-96 bg-gray-200">
            <img src="/default-placeholder.png" alt={product.attributes.nombre} class="object-cover h-full w-full" />
            <!-- Adjust image src based on your actual product image structure -->
          </figure>
          <div class="card-body">
            <h2 class="card-title text-2xl font-bold">{product.attributes.nombre}</h2>
            <p class="my-4">{product.attributes.descripcion}</p>
            <span class="text-lg font-bold">${product.attributes.precio}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}
