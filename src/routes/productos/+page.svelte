<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { baseURL } from '@/config';
    import ProductCard from '@/components/ProductCard.svelte'; // Adjust the path as necessary

    // Your existing TypeScript interface for Product
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
          }[] | null;
        };
      };
      imageUrl?: string;
    }

    let isLoading = writable(true);
    let error = writable(null);
    let productos: Product[] = [];

    onMount(async () => {
        isLoading.set(true);
        try {
            const response = await fetch(`${baseURL}/api/productos?populate=*`);
            if (response.ok) {
                const data = await response.json();
                productos = data.data.map((producto: Product) => ({
                    ...producto,
                    imageUrl: producto.attributes.foto.data && producto.attributes.foto.data.length > 0
                        ? `${baseURL}${producto.attributes.foto.data[0].attributes.url}`
                        : 'default-placeholder.png'
                }));
                isLoading.set(false);
            } else {
                console.error('API fetch failed:', response.statusText);
                error.set(response.statusText);
            }
        } catch (err) {
            console.error('Fetch error:', err);
            error.set(err.message);
        } finally {
            isLoading.set(false);
        }
    });
</script>

<!-- Products Section -->
<div class="container px-4 mx-auto">
    <h1 class="text-4xl font-bold text-center my-10">Tienda</h1>
    <h2 class="text-2xl font-bold mb-6">Productos</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each productos as product}
            <script>
                console.log(product); // Check the structure matches what ProductCard expects
            </script>
            <ProductCard {product} />
        {/each}
    </div>
</div>
