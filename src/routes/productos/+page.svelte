<script lang="ts">
    import { onMount } from 'svelte';
    import { baseURL } from '/src/config.ts';
    
    let productos = [];
    
    onMount(async () => {
        try {
            const response = await fetch(`${baseURL}/api/productos?populate=*`);
            if (response.ok) {
                const data = await response.json();
                // Assuming the API returns data in { data: [...] } format
                productos = data.data.map(producto => ({
                    ...producto,
                    // Check if foto.data is not null before accessing its properties
                    imageUrl: producto.attributes.foto.data && producto.attributes.foto.data.length > 0
                        ? `${baseURL}${producto.attributes.foto.data[0].attributes.url}`
                        : null
                }));
            } else {
                console.error('API fetch failed:', response.statusText);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });
</script>
  
<div data-theme="emerald" class="container px-4 mx-auto">
    <h1 class="text-4xl font-bold text-center my-10">Tienda</h1>
    
    <!-- Products Section -->
    <div>
        <h2 class="text-2xl font-bold mb-6">Productos</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each productos as producto}
                <!-- Link to the product detail page -->
                <a href={`/productos/${producto.attributes.slug}`} class="card card-compact bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300" sveltekit:prefetch>
                    <figure class="h-48 bg-gray-200">
                        <!-- Use the imageUrl property if available, otherwise show a placeholder -->
                        <img src={producto.imageUrl || "/default-placeholder.png"} alt={producto.attributes.nombre} class="object-cover h-full w-full" />
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
</div>

<style>
    /* Custom styles if needed */
</style>
