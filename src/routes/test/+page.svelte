<script lang="ts">
    import { onMount } from 'svelte';
    import { baseURL } from '/src/config.ts';
    let categoriaProductos = [];
    let categoriaName = ""; // Assuming you want to display the category name

    const categoriaSlug = 'analytical-instruments'; // Example category slug

    onMount(async () => {
        console.log('Fetching category products...');
        try {
            const response = await fetch(`${baseURL}/api/categorias?filters[slug]=${categoriaSlug}&populate=productos`); // Ensure populate parameter matches your Strapi configuration
            if (response.ok) {
                const data = await response.json();
                console.log('API data:', data);
                // Correctly handle the productos array
                if (data.data.length > 0 && data.data[0].attributes.productos.data) {
                    categoriaProductos = data.data[0].attributes.productos.data; // Directly assign the array
                    categoriaName = data.data[0].attributes.categoria;
                    console.log('Extracted products:', categoriaProductos);
                } else {
                    console.error('No products found or incorrect data structure');
                }
            } else {
                console.error('API fetch failed:', response.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });
</script>

<div data-theme="emerald" class="container px-4 mx-auto">
    <h1 class="text-4xl font-bold text-center my-10">{categoriaName}</h1>
    <!-- Products Section -->
    {#if categoriaProductos && categoriaProductos.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each categoriaProductos as producto}
                <div class="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <figure>
                        <img src={producto.attributes.foto || 'default-placeholder.png'} alt={producto.attributes.nombre} class="object-cover h-full w-full" />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title">{producto.attributes.nombre}</h3>
                        <div class="flex justify-between items-center mt-4">
                            <span class="text-lg font-bold">${producto.attributes.precio}</span>
                            <button class="btn btn-primary">Contactar</button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <p>No products found for this category.</p>
    {/if}
</div>



<style>
    /* Custom styles can be added here if needed */
</style>
