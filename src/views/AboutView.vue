<template>
  <div class="container mx-auto px-4 py-12 max-w-7xl">
    <header class="mb-12 text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Sobre nosotros</h1>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Somos un grupo apasionado de desarrolladores, diseñadores y gerentes de proyectos que buscan
        convertir ideas en soluciones digitales innovadoras.
      </p>
    </header>

    <div class="space-y-12">
      <section class="bg-gray-50 rounded-2xl p-8 border border-gray-100">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h2>
        <p class="text-gray-600 text-lg leading-relaxed">
          Ser principal proveedor de soluciones tecnológicas innovadoras y servicios de excelencia a
          empresas en Cancún y el mundo.
        </p>
      </section>

      <section class="bg-gray-50 rounded-2xl p-8 border border-gray-100">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h2>
        <p class="text-gray-600 text-lg leading-relaxed">
          Equipar a empresas con soluciones digitales de vanguardia que les permitan alcanzar sus
          metas mientras brindamos un servicio excepcional.
        </p>
      </section>

      <section>
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Conoce nuestro equipo</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="member in userStore.users"
            :key="member.name"
            class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
          >
            <div class="text-center">
              <div class="mb-4">
                <h3 class="text-xl font-semibold text-gray-900">{{ member.name }}</h3>
                <p class="text-blue-600 font-medium">{{ member.role }}</p>
              </div>
              <div class="flex justify-center space-x-4">
                <a
                  :href="member.linkedin"
                  class="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <span class="sr-only">LinkedIn</span>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Reconocimientos y Premios</h2>
        <ul class="grid md:grid-cols-3 gap-6">
          <li
            v-for="award in awards"
            :key="award"
            class="bg-white p-6 inline-flex items-center justify-center rounded-xl border border-gray-100 shadow-sm"
          >
            <div class="text-blue-600 mx-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900">{{ award }}</h3>
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Proyectos Destacados</h2>
        <div class="grid lg:grid-cols-3 gap-6">
          <div
            v-for="project in projects"
            :key="project.name"
            class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 class="font-semibold text-lg text-gray-900 mb-2">{{ project.name }}</h3>
            <p class="text-gray-600">{{ project.description }}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Testimonios de Clientes</h2>
        <div class="grid lg:grid-cols-2 gap-6">
          <blockquote
            v-for="testimonial in testimonials"
            :key="testimonial.message"
            class="bg-blue-50 p-8 rounded-2xl border-l-4 border-blue-300"
          >
            <p class="text-gray-700 text-lg italic mb-4">"{{ testimonial.message }}"</p>
            <div class="flex items-center">
              <img
                :src="testimonial.photo"
                alt="Foto de {{ testimonial.client }}"
                class="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p class="font-semibold text-gray-900">{{ testimonial.client }}</p>
                <p class="text-sm text-gray-600">{{ testimonial.position }}</p>
              </div>
            </div>
          </blockquote>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUsers()
})

const awards = ref([
  'Premio a la Empresa Más Sarcástica 2025, porque el sarcasmo es nuestro segundo idioma',
  'Galardón de Innovación en GIFs Inútiles 2025, porque los GIFs realmente cambian el mundo',
  'Premio a la Excelencia en Bromas Pesadas 2025, porque nada dice éxito como molestar a todos',
])

const projects = ref([
  {
    name: 'Plataforma de Memes',
    description:
      'Desarrollo de una plataforma para compartir y crear memes épicos, porque claramente el mundo necesita más memes.',
  },
  {
    name: 'Aplicación Móvil de Bromas',
    description:
      'Aplicación móvil para enviar bromas y chistes a tus amigos, porque ¿quién no quiere ser molestado constantemente?',
  },
  {
    name: 'Solución de GIFs en la Nube',
    description:
      'Sistema basado en la nube para la gestión y creación de GIFs divertidos, porque los GIFs son la solución a todos los problemas del mundo.',
  },
])

const testimonials = ref([
  {
    message:
      'Transformaron nuestras reuniones aburridas en sesiones de risas interminables. Ahora, nadie quiere trabajar.',
    client: 'María Rodríguez',
    position: 'COO, Empresa Y',
    photo: 'https://i.pravatar.cc/251',
  },
  {
    message:
      'Gracias a ellos, ahora mis empleados no pueden dejar de enviar memes en horas de trabajo. ¡Productividad al máximo!',
    client: 'Juan Pérez',
    position: 'Gerente, Empresa Z',
    photo: 'https://i.pravatar.cc/252',
  },
  {
    message:
      'Si pudiera, les daría un premio por hacerme perder tanto tiempo en su plataforma. ¡Eficiencia redefinida!',
    client: 'Ana Gómez',
    position: 'Directora, Empresa W',
    photo: 'https://i.pravatar.cc/253',
  },
  {
    message:
      'Mis amigos ya no me soportan por enviarles tantos GIFs, ¡gracias! La soledad nunca fue tan divertida.',
    client: 'Luis Fernández',
    position: 'Freelancer',
    photo: 'https://i.pravatar.cc/254',
  },
])
</script>
