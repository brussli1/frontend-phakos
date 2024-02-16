<script lang="ts">
    import { onMount } from 'svelte';
  
    let contactName: string = '';
    let contactEmail: string = '';
    let contactMessage: string = '';
  
    const handleSubmit = async (event: Event): Promise<void> => {
      event.preventDefault(); // Prevent the form from submitting in the traditional way
      // Implement your form submission logic here, e.g., sending data to an API
      console.log({ contactName, contactEmail, contactMessage });
      // Reset form fields after submission
      contactName = '';
      contactEmail = '';
      contactMessage = '';
    };
  </script>
  
  <svelte:head>
    <title>Contact Us</title>
    <meta name="description" content="Contact us for more information, questions, or feedback.">
  </svelte:head>
  
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold text-center mb-6">Contact Us</h1>
    <form class="form-control w-full max-w-xs mx-auto" on:submit|preventDefault={handleSubmit}>
      <label class="label">
        <span class="label-text">Name</span>
      </label>
      <input type="text" bind:value={contactName} class="input input-bordered w-full max-w-xs" required />
  
      <label class="label">
        <span class="label-text">Email</span>
      </label>
      <input type="email" bind:value={contactEmail} class="input input-bordered w-full max-w-xs" required />
  
      <label class="label">
        <span class="label-text">Message</span>
      </label>
      <textarea bind:value={contactMessage} class="textarea textarea-bordered w-full max-w-xs" required></textarea>
  
      <button type="submit" class="btn btn-primary mt-4">Send Message</button>
    </form>
  </div>
  
  <style>
    /* Additional styling as needed */
  </style>
  