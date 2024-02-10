
<script>
  import "tailwindcss/tailwind.css";
  import { onMount } from 'svelte';
  import { baseURL } from '/src/config.ts'; // Assuming baseURL is your Strapi base URL

  let categoria = [];

  onMount(async () => {
    const response = await fetch(`${baseURL}/api/categorias`);
    if (response.ok) {
      const data = await response.json();
      categoria = data.data;
    }
  });
</script>

<nav class="navbar bg-base-100 px-2 sm:px-4 py-2.5 rounded">
	<div class="container flex flex-wrap justify-between items-center mx-auto">
	  <a href="/" class="flex">
		<!-- Replace with your logo or brand name -->
		<span class="self-center text-lg font-semibold whitespace-nowrap dark:text-white">PHAKOS</span>
	  </a>
	  <div class="flex">
		<!-- Category Navbar -->
	  <div class="flex md:order-2">
		<button class="btn btn-primary">Whatsapp</button>
		<div class="dropdown dropdown-end">
		  <label tabindex="0" class="btn btn-ghost btn-circle avatar">
			<div class="w-10 rounded-full">
			  <!-- <img asrc="path_to_your_avatar_image" alt="User Menu"/>-->
			</div>
		  </label>
		  <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
			<li><a href="/profile">Profile</a></li>
			<li><a href="/settings">Settings</a></li>
			<li><a href="/logout">Logout</a></li>
		  </ul>
		</div>
	  </div>
	  <div class="hidden w-full md:block md:w-auto" id="navbar-default">
		<ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-700 md:dark:bg-gray-800 dark:border-gray-700">
		  <li><a href="/productos" class="btn btn-ghost">Productos</a></li>
		  <li><a href="/marcas" class="btn btn-ghost">Marcas</a></li>
		  <li><a href="/latest" class="btn btn-ghost">Lo Último</a></li>
		  <li><a href="/clearance" class="btn btn-ghost">Promociones</a></li>
		  <li><a href="/used" class="btn btn-ghost">Usados</a></li>
		  <li><a href="/leasing" class="btn btn-ghost">Alquiler</a></li>
		  <li><a href="/support" class="btn btn-ghost">Soporte</a></li>
		  <li><a href="/contact" class="btn btn-ghost">Contacto</a></li>
		  <!-- Additional items... -->
		</ul>
	  </div>
	</div>
  </nav>
  <div class="flex">
	<!-- Sidebar component or wherever your category links are generated -->
	<aside class="menu bg-base-200 w-56 h-screen p-5">
		<ul>
		{#each categoria as category}
			<li><a sveltekit:prefetch href={`/category/${category.attributes.slug}`}>{category.attributes.categoria}</a></li>
		{/each}
		</ul>
	</aside>
  
	
  
	<main class="flex-grow">
	  <slot />
	</main>
  </div>