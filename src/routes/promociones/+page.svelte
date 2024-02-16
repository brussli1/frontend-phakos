<script lang="ts">
    import { onMount } from 'svelte';
    import { baseURL } from '@/config';
  
    interface Producto {
      id: number;
      attributes: {
        nombre: string;
        descripcion: string;
        precio: number;
        slug: string;
      };
    }
  
    interface Promo {
      id: number;
      attributes: {
        nombre: string;
        slug: string;
        productos: {
          data: Producto[];
        };
      };
    }
  
    let promos: Promo[] = [];
  
    onMount(async () => {
      try {
        const response = await fetch(`${baseURL}/api/promocions?populate=*`);
        if (response.ok) {
          const data = await response.json();
          promos = data.data;
        } else {
          console.error('API fetch failed:', response.statusText);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    });
  </script>
  
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold text-center my-10">Promos</h1>
    {#each promos as {attributes: promo}}
      <div class="promo mb-8">
        <h2 class="text-3xl font-semibold">{promo.nombre}</h2>
        {#if promo.productos.data.length > 0}
          <div class="productos mt-4">
            {#each promo.productos.data as {attributes: producto}}
              <div class="producto mb-4">
                <h3 class="text-2xl">{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <span class="text-lg font-bold">$ {producto.precio}</span>
              </div>
            {/each}
          </div>
        {:else}
          <p>No products found for this promo.</p>
        {/if}
      </div>
    {/each}
  </div>
  