<script>
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import axios from 'axios';

	// creating vars
	let formData = {},
		errors = {},
		loading = false;

	//checking if email machtes email regex while typing
	function emailValidation(node, email) {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return {
			update(email) {
				console.log(email);
				if (!email) return;
				if (!re.test(String(email).toLowerCase())) {
					errors['email'] = 'entered String is not an email';
				} else {
					errors['email'] = undefined;
				}
			}
		};
	}
	//checking if phonenumber machtes phone regex while typing
	function phoneValidation(node, phone) {
		const re = /^\+1([0-9]+)$/;
		return {
			update(phone) {
				if (!phone) return;
				if (!re.test(String(phone).toLowerCase())) {
					errors['phone'] = 'This is not a valid phone number';
				} else {
					errors['phone'] = undefined;
				}
			}
		};
	}
	// submiting the data from the form and checking if every field is not null
	function submit() {
		loading = true;
		if (!formData.email) {
			errors['email'] = 'No Email entered';
			return;
		}
		if (!formData.name) {
			errors['name'] = 'No Name enterd';
			return;
		}
		if (!formData.textfield) {
			errors['textfield'] = 'no text entered';
			return;
		}
		if (!formData.phone) {
			errors['phone'] = 'no phone number entered';
			return;
		}
		axios
			.post(`/mails/send`, formData)
			.then(() => {
				loading = false;
			})
			.catch((er) => {
				errors['send'] = er;
			});
	}
</script>

<section
	class="w-full text-gray-900 py-36 bg-center bg-cover bg-no-repeat"
	style="background:url('https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=1280')"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 flex items-center justify-center">
		<div class="lg:w-3/6 lg:pr-0 pr-0">
			<h1 class="font-medium text-5xl text-white">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			</h1>
			<p class="leading-relaxed mt-4 text-white">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua.
			</p>
		</div>
		<div
			class="lg:w-3/6 xl:w-2/5 md:w-full bg-gray-50 p-8 flex flex-col lg:ml-auto w-full mt-10 lg:mt-0 rounded-md"
		>
			<div class="relative mb-4">
				<label for="full-name" class="leading-7 text-sm text-gray-600">Name</label>
				<input
					type="text"
					id="name"
					name="name"
					bind:value={formData.name}
					class="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out"
				/>
				{#if errors['name']}
					<label
						for="name"
						class="text-red-600"
						transition:slide={{ delay: 250, duration: 300, easing: quintOut }}
						>{errors['name']}</label
					>
				{/if}
			</div>
			<div class="relative mb-4">
				<label for="email" class="leading-7 text-sm text-gray-600">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					bind:value={formData.email}
					use:emailValidation={formData.email}
					class="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out"
				/>
				{#if errors['email']}
					<label
						for="email"
						class="text-red-600"
						transition:slide={{ delay: 250, duration: 300, easing: quintOut }}
						>{errors['email']}</label
					>
				{/if}
			</div>
			<div class="relative mb-4">
				<label for="phone" class="leading-7 text-sm text-gray-600">Phone</label>
				<input
					type="tel"
					id="phone"
					name="phone"
					bind:value={formData.phone}
					use:phoneValidation={formData.phone}
					class="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out"
				/>
				{#if errors['phone']}
					<label
						for=""
						class="text-red-600"
						transition:slide={{ delay: 250, duration: 300, easing: quintOut }}
						>{errors['phone']}</label
					>
				{/if}
			</div>
			<div class="relative mb-4">
				<label for="email" class="leading-7 text-sm text-gray-600">Message</label>
				<textarea
					id="message"
					name="message"
					rows="4"
					bind:value={formData.textfield}
					class="w-full bg-white rounded-md border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-150 ease-in-out"
				/>
			</div>
			<button
				class="text-white bg-indigo-500 rounded-md border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 text-lg"
				on:click={submit}
			>
				{#if loading}
					<span class="animate-spin"> loading</span>
				{:else}
					Submit
				{/if}
			</button>
			{#if errors['send']}
				<label
					for="button"
					class="text-red-600"
					transition:slide={{ delay: 250, duration: 300, easing: quintOut }}>{errors['send']}</label
				>
			{/if}
		</div>
	</div>
</section>
