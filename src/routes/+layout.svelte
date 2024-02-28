<script lang="ts">
	import "tailwindcss/tailwind.css";
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	// Use the correct import path with alias and without .ts extension
	import { baseURL, phoneNumber } from '@/config';
	import type { Category } from '../types'; 

	let categories: Category[] = []; // Renamed for clarity and typed
	let isMenuOpen = writable(false); // Store to manage menu visibility

	function redirectToWhatsApp() {
    const message = encodeURIComponent("Buenas, te contacto desde el sitio web de Phakos");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    }

	onMount(async () => {
	  try {
		const response = await fetch(`${baseURL}/api/categorias?populate=*`);
		if (response.ok) {
		  const data = await response.json();
		  categories = data.data;
		} else {
		  console.error('Failed to fetch categories', response.statusText);
		}
	  } catch (error) {
		console.error('Fetch error:', error);
	  }


	});
  </script>
<div data-theme="emerald" class="w-full">		
	<div class="btm-nav md:hidden fixed inset-x-0 bottom-0 z-10 bg-white">
		<button class="flex-1">
		<a href="/" class="block p-4 text-center">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
			</svg>
			<span class="btm-nav-label">Home</span>
		</a>
		</button>
		<button class="flex-1">
		<a href="/productos" class="block p-4 text-center">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			<span class="btm-nav-label">Productos</span>
		</a>
		</button>
		<button class="flex-1" on:click={redirectToWhatsApp}>
		<div class="block p-4 text-center">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8a6 6 0 00-12 0v4a6 6 0 0012 0V8zM12 18a6 6 0 00-6 6v2h12v-2a6 6 0 00-6-6z" />
			</svg>
			<span class="btm-nav-label">WhatsApp</span>
		</div>
		</button>
	</div>
	
	
	<nav class="navbar bg-red-200 px-2 px-4 py-2.5 rounded animated-gradient">
			<div class="container flex justify-between items-center mx-auto">
				<div class="shrink-0">
					<a href="/" class="flex items-center">
						<img src="/logo-phakos.png" alt="PHAKOS" class="h-20">
					</a>
				</div>
		<div class="container flex flex-wrap justify-between items-center mx-auto">
			<button class="btn btn-square btn-ghost md:hidden" on:click={() => isMenuOpen.update(n => !n)}>
				Menu
			</button>
		
		<!-- Navigation Links -->
		
		<div class="hidden md:flex items-center space-x-4 px-40">
			<!-- Adjust the class from flex-col to flex-row for horizontal alignment -->
			<ul class="flex flex-row p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm font-medium ">
			<li><a href="/productos" class="btn btn-ghost font-bold">Productos</a></li>
			<li><a href="/marcas" class="btn btn-ghost font-bold">Marcas</a></li>
			<li><a href="/latest" class="btn btn-ghost font-bold">Lo Último</a></li>
			<li><a href="/promociones" class="btn btn-ghost font-bold">Promociones</a></li>
			<li><a href="/usados" class="btn btn-ghost font-bold">Usados</a></li>
			<li><a href="/alquiler" class="btn btn-ghost font-bold">Alquiler</a></li>
			<li><a href="/soporte" class="btn btn-ghost font-bold">Soporte</a></li>
			<li><a href="/contacto" class="btn btn-ghost font-bold">Contacto</a></li>
			<li><button class="btn btn-primary" on:click={redirectToWhatsApp}>Whatsapp</button></li>
			<!-- Additional items... -->
			</ul>
		</div>
		
		</div>
		{#if $isMenuOpen}
			<div class="absolute inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
				<div class="bg-white rounded-lg shadow-lg p-4 md:p-6">
					<ul class="menu menu-vertical bg-gray-50 rounded-lg border border-gray-100 text-sm font-medium">
						<li><a href="/" class="menu-item" on:click={() => $isMenuOpen = false}>Inicio</a></li>
						<li><a href="/productos" class="menu-item" on:click={() => $isMenuOpen = false}>Productos</a></li>
						<li><a href="/marcas" class="menu-item" on:click={() => $isMenuOpen = false}>Marcas</a></li>
						<li><a href="/latest" class="menu-item" on:click={() => $isMenuOpen = false}>Lo Último</a></li>
						<li><a href="/promociones" class="menu-item" on:click={() => $isMenuOpen = false}>Promociones</a></li>
						<li><a href="/usados" class="menu-item" on:click={() => $isMenuOpen = false}>Usados</a></li>
						<li><a href="/alquiler" class="menu-item" on:click={() => $isMenuOpen = false}>Alquiler</a></li>
						<li><a href="/soporte" class="menu-item" on:click={() => $isMenuOpen = false}>Soporte</a></li>
						<li><a href="/contacto" class="menu-item" on:click={() => $isMenuOpen = false}>Contacto</a></li>
					</ul>
				</div>
			</div>
		{/if}

	</nav>
	<div class="flex flex-col md:flex-row">
		<aside class="hidden md:block menu bg-red-400 animated-gradient-aside w-54 rounded text-white hover:text-white-400 shadow">
		<ul>
			{#each categories as category} <!-- Renamed to 'categories' -->
			<li><a href={`/category/${category.attributes.slug}`} on:click|preventDefault={() => window.location.href = `/category/${category.attributes.slug}`}>{category.attributes.categoria}</a></li>
			<div class="divider custom-divider"></div>
			{/each}
		</ul>
		</aside>
		<main class="flex-grow custom-background">
		<slot />
		</main>
	</div>
	<footer class="footer p-10 bg-neutral text-neutral-content">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
		  <!-- Sección de Contacto Mejorada -->
		  <div>
			<div class="flex flex-col">
			<a href="/" class="flex items-center mb-4">
			  <img src="/logo-phakos.png" alt="PHAKOS Logo" class="h-20 mr-2">
			</a>
			</div>
		  </div>
		  <div class="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg text-white">
			<div class="flex flex-col">
			<a href="/contacto" class="link link-hover"> Contáctanos</a>
			<p>Tel: 0985366405</p>
			<a href="/mapa" class="link link-hover">Cnel. Vicente Machuca, San Lorenzo</a>
			<p>td.phakos@gmail.com</p>
			</div>
		  </div>
	  
		  <!-- Secciones del Footer -->
		  <div>
			<div class="flex flex-col">
			<span class="footer-title">Servicios</span>
			<a href="/category" class="link link-hover"> Venta de instrumentos, insumos y equipos oftalmológicos.</a>
			</div>
		  </div>
	  
		  <div>
			<div class="flex flex-col">
			<span class="footer-title">Compañía</span>
			<a href="/contacto" class="link link-hover">Contacto</a>
			<a href="/mapa" class="link link-hover">Localización</a>
			</div>
		</div>
	  
		  <div>
			<div class="flex flex-col">
			<span class="footer-title">Legal</span>
			<a href="/tos" class="link link-hover">Términos de uso</a>
			<a href="/privacidad" class="link link-hover">Política de privacidad</a>
		    </div>
		  </div>
		</div>
	  </footer>
	  
</div>  
<style>
	@keyframes gradientShift {
	  0% { background-position: 0% 100%; }
	  50% { background-position: 100% 0%; }
	  100% { background-position:0% 75%; }
	}
  
	.animated-gradient:hover {
	  background: linear-gradient(90deg, #ff0000d0,  #ffa9a9c0 ,#ff0606);
	  background-size: 200% 200%;
	  animation: gradientShift 15s linear infinite;
	}
	.animated-gradient-aside:hover {
	  background: linear-gradient(0deg, #fd2828d0,  #fc6565c0 ,#ff2b2b);
	  background-size: 200% 200%;
	  animation: gradientShift 3s linear infinite;
	}
	.custom-divider {
    margin-top: 1px;
    margin-bottom: 1px;
	}

	.custom-background {
		background-image: url('/background.svg');
  		background-size: cover; /* Adjust as needed */
	}

	.shadow-intense {
	box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.5), 0 0px 0px 0px rgba(0, 0, 0, 0);
	}
</style>