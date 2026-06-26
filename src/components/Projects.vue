<template>
  <section id="projects" class="proj" ref="sectionRef">

    <!-- ─── Header ─── -->
    <header class="proj-head reveal">
      <div class="proj-head__left">
        <span class="proj-head__line"></span>
        <span class="proj-head__label">02 — Selected Work</span>
      </div>
      <div class="proj-head__right">
        <span class="proj-head__live">
          <span class="dot dot--live"></span>
          {{ liveCount }} Live&ensp;·&ensp;{{ projects.length }} Total
        </span>
        <a
          href="https://github.com/Njenga993"
          target="_blank"
          rel="noopener noreferrer"
          class="proj-head__gh"
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
          <span>Njenga993</span>
        </a>
      </div>
    </header>

    <!-- ─── Featured Project ─── -->
    <Transition name="feat" mode="out-in">
      <div
        :key="featured.id"
        class="feat reveal"
        ref="featRef"
        @mousemove="onFeatMove"
        @mouseleave="onFeatLeave"
        @click="openModal(featured)"
        @keydown.enter="openModal(featured)"
        tabindex="0"
        role="button"
        :aria-label="'View ' + featured.title + ' case study'"
      >
        <div class="feat__bg">
          <img
            v-if="featured.image && !failedImages.has(featured.id)"
            :src="featured.image"
            :alt="featured.title"
            loading="eager"
            @error="failedImages.add(featured.id)"
          />
          <div v-else class="feat__fallback">
            <span class="feat__fallback-icon">{{ featured.icon }}</span>
            <span class="feat__fallback-name">{{ featured.title }}</span>
          </div>
          <div class="feat__overlay"></div>
          <div class="feat__glow"></div>
        </div>

        <div class="feat__content">
          <div class="feat__top">
            <span class="feat__num">01</span>
            <span class="feat__status" :class="featured.status">
              {{ featured.status === 'live' ? '● Deployed' : '◌ In Development' }}
            </span>
          </div>
          <div class="feat__mid">
            <span class="feat__cat">{{ featured.category }}</span>
            <h2 class="feat__title">{{ featured.title }}</h2>
            <p class="feat__tag">{{ featured.tagline }}</p>
          </div>
          <div class="feat__bot">
            <div class="feat__stack">
              <span v-for="t in featured.stack.slice(0, 4)" :key="t">{{ t }}</span>
            </div>
            <span class="feat__explore">
              Explore Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 7h12M8 2l5 5-5 5"/></svg>
            </span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ─── Filters ─── -->
    <nav
      class="proj-filters reveal"
      ref="filtersRef"
      role="tablist"
      aria-label="Filter projects by category"
    >
      <button
        v-for="cat in categories"
        :key="cat"
        :ref="el => { if (el) filterBtnEls[cat] = el }"
        :class="['proj-filters__btn', { active: activeFilter === cat }]"
        role="tab"
        :aria-selected="String(activeFilter === cat)"
        @click="activeFilter = cat"
      >
        {{ cat }}
        <span class="proj-filters__cnt">{{ getCount(cat) }}</span>
      </button>
      <span class="proj-filters__bar" :style="indicatorStyle"></span>
    </nav>

    <!-- ─── Project List ─── -->
    <div class="proj-list" :key="activeFilter + sortBy">
      <article
        v-for="(p, i) in filteredSorted"
        :key="p.id"
        class="proj-row reveal"
        :style="{ '--d': 0.04 + i * 0.06 + 's' }"
        :ref="el => { if (el) rowEls[p.id] = el }"
        @click="openModal(p)"
        @keydown.enter="openModal(p)"
        @mousemove="onRowMove($event, p.id)"
        @mouseleave="onRowLeave(p.id)"
        tabindex="0"
        role="button"
        :aria-label="'View ' + p.title + ' case study'"
      >
        <span class="proj-row__num">{{ String(i + 2).padStart(2, '0') }}</span>

        <div class="proj-row__thumb">
          <img
            v-if="p.image && !failedImages.has(p.id)"
            :src="p.image"
            
            loading="lazy"
            @error="failedImages.add(p.id)"
          />
          <span v-else class="proj-row__thumb-fb">{{ p.icon }}</span>
          <div class="proj-row__glow"></div>
        </div>

        <div class="proj-row__info">
          <div class="proj-row__meta">
            <span class="proj-row__cat">{{ p.category }}</span>
            <span v-if="p.impact" class="proj-row__impact">{{ p.impact }}</span>
          </div>
          <h3 class="proj-row__title">{{ p.title }}</h3>
          <p class="proj-row__tag">{{ p.tagline }}</p>
          <div class="proj-row__techs">
            <span v-for="t in p.stack.slice(0, 3)" :key="t">{{ t }}</span>
            <span v-if="p.stack.length > 3" class="proj-row__more">+{{ p.stack.length - 3 }}</span>
          </div>
        </div>

        <div class="proj-row__end">
          <span class="proj-row__dot" :class="p.status" :title="p.status === 'live' ? 'Live' : 'In development'"></span>
          <svg class="proj-row__arrow" width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 7h12M8 2l5 5-5 5"/></svg>
        </div>
      </article>
    </div>

    <!-- ─── CTA ─── -->
    <div class="proj-cta reveal" ref="ctaRef">
      <div class="proj-cta__text">
        <h3>Have a project in mind?</h3>
        <p>I specialise in full-stack systems, e-commerce platforms, and data-driven tools for African markets.</p>
      </div>
      <a href="#contact" class="proj-cta__btn" @click.prevent="scrollToContact">
        <span>Let's Build Together</span>
        <span class="proj-cta__btn-icon">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 7h12M8 2l5 5-5 5"/></svg>
        </span>
      </a>
    </div>

    <!-- ─── Stats Strip ─── -->
    <footer class="proj-stats reveal" ref="statsRef">
      <div class="proj-stats__items">
        <div class="proj-stats__item">
          <span class="proj-stats__num">{{ displayedCounts.projects }}</span>
          <span class="proj-stats__label">Projects</span>
        </div>
        <span class="proj-stats__div"></span>
        <div class="proj-stats__item">
          <span class="proj-stats__num">{{ displayedCounts.live }}</span>
          <span class="proj-stats__label">Live</span>
        </div>
        <span class="proj-stats__div"></span>
        <div class="proj-stats__item">
          <span class="proj-stats__num">{{ displayedCounts.tech }}</span>
          <span class="proj-stats__label">Technologies</span>
        </div>
        <span class="proj-stats__div"></span>
        <div class="proj-stats__item">
          <span class="proj-stats__num">{{ displayedCounts.industries }}</span>
          <span class="proj-stats__label">Industries</span>
        </div>
      </div>
      <div class="proj-stats__socials">
        <a href="https://github.com/Njenga993" target="_blank" rel="noopener" aria-label="GitHub" class="proj-stats__soc">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/kelvin-kamau-788160277/" target="_blank" rel="noopener" aria-label="LinkedIn" class="proj-stats__soc">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a href="https://x.com/kamau_nje" target="_blank" rel="noopener" aria-label="X" class="proj-stats__soc">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
      </div>
    </footer>
  </section>

  <!-- ════════════════════ MODAL ════════════════════ -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="activeProject"
        class="modal-overlay"
        @click.self="closeModal"
        role="dialog"
        aria-modal="true"
        :aria-label="activeProject.title + ' case study'"
      >
        <button class="modal__close" @click="closeModal" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div class="modal" ref="modalRef">
          <!-- Left: visual -->
          <div class="modal__vis">
            <Transition name="vis-fade" mode="out-in">
              <img
                v-if="activeProject.image && !failedImages.has(activeProject.id)"
                :key="'img-' + activeProject.id"
                :src="activeProject.image"
                :alt="activeProject.title"
                class="modal__vis-img"
                @error="failedImages.add(activeProject.id)"
              />
              <div v-else :key="'fb-' + activeProject.id" class="modal__vis-fb">
                <span class="modal__vis-fb-icon">{{ activeProject.icon }}</span>
                <span class="modal__vis-fb-name">{{ activeProject.title }}</span>
              </div>
            </Transition>
            <div class="modal__vis-grad"></div>
            <div class="modal__vis-info">
              <span class="modal__vis-status" :class="activeProject.status">
                <span class="ms-dot"></span>
                {{ activeProject.status === 'live' ? 'Live in Production' : 'In Development' }}
              </span>
              <div class="modal__vis-links">
                <a
                  v-if="activeProject.demo && activeProject.demo !== '#'"
                  :href="activeProject.demo"
                  target="_blank"
                  rel="noopener"
                  class="modal__vis-link modal__vis-link--primary"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                  Live Demo
                </a>
                <a
                  v-if="activeProject.github"
                  :href="activeProject.github"
                  target="_blank"
                  rel="noopener"
                  class="modal__vis-link modal__vis-link--ghost"
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                  Source
                </a>
              </div>
            </div>
            <span class="modal__vis-wm">{{ String(currentIdx + 1).padStart(2, '0') }}</span>
          </div>

          <!-- Right: content -->
          <div class="modal__body" :key="activeProject.id" ref="modalBodyRef">
            <div class="mi" style="--mi:0.05s">
              <span class="modal__cat">{{ activeProject.category }}</span>
              <h2 class="modal__title">{{ activeProject.title }}</h2>
              <p class="modal__tagline">{{ activeProject.tagline }}</p>
            </div>

            <p class="modal__desc mi" style="--mi:0.1s">{{ activeProject.description }}</p>

            <div class="modal__ps mi" style="--mi:0.16s">
              <div class="modal__block">
                <div class="modal__block-head">
                  <span class="modal__block-dot modal__block-dot--prob"></span>
                  <span>The Problem</span>
                </div>
                <p>{{ activeProject.problem }}</p>
              </div>
              <div class="modal__block">
                <div class="modal__block-head">
                  <span class="modal__block-dot modal__block-dot--sol"></span>
                  <span>The Solution</span>
                </div>
                <p>{{ activeProject.solution }}</p>
              </div>
            </div>

            <div class="modal__metrics mi" style="--mi:0.22s" v-if="activeProject.metrics?.length">
              <div class="modal__sec-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                Impact Metrics
              </div>
              <div class="modal__metrics-grid">
                <div v-for="m in activeProject.metrics" :key="m.label" class="modal__metric">
                  <span class="modal__metric-val">{{ m.value }}</span>
                  <span class="modal__metric-label">{{ m.label }}</span>
                </div>
              </div>
            </div>

            <div class="modal__features mi" style="--mi:0.28s">
              <div class="modal__sec-label">
                <span class="modal__sec-dot"></span>
                Key Features
              </div>
              <ul class="modal__feat-list">
                <li v-for="f in activeProject.features" :key="f">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>{{ f }}</span>
                </li>
              </ul>
            </div>

            <div class="modal__stack mi" style="--mi:0.34s">
              <div class="modal__sec-label">
                <span class="modal__sec-dot"></span>
                Tech Stack
              </div>
              <div class="modal__pills">
                <span v-for="t in activeProject.stack" :key="t" class="modal__pill">{{ t }}</span>
              </div>
            </div>

            <div class="modal__nav mi" style="--mi:0.4s">
              <button class="modal__nav-btn" :disabled="!prevProject" @click="navigate('prev')">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 7H1M6 2L1 7l5 5"/></svg>
                Prev
              </button>
              <span class="modal__nav-counter">
                {{ String(currentIdx + 1).padStart(2, '0') }}<span class="modal__nav-sep">/</span>{{ String(projects.length).padStart(2, '0') }}
              </span>
              <button class="modal__nav-btn" :disabled="!nextProject" @click="navigate('next')">
                Next
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 7h12M8 2l5 5-5 5"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>


<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

/* ═══════════════════════════════════════════════════════
   Composables
   ═══════════════════════════════════════════════════════ */

/** Observe .reveal elements inside a root and add .revealed on intersect */
function useReveal(rootRef) {
  let io = null
  onMounted(() => {
    if (!rootRef.value) return
    io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target) } }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    rootRef.value.querySelectorAll('.reveal').forEach(el => io.observe(el))
  })
  onUnmounted(() => { if (io) io.disconnect() })
}

/** Animated counter that eases from 0 → target */
function useCounter(target, duration = 1400) {
  const current = ref(0)
  let raf = null
  function start() {
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      current.value = Math.round((1 - Math.pow(1 - p, 3)) * target)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
  }
  function stop() { if (raf) cancelAnimationFrame(raf) }
  return { current, start, stop }
}

/** Focus trap for modal accessibility */
function useFocusTrap(containerRef) {
  let prev = null
  const handler = (e) => {
    if (e.key !== 'Tab' || !containerRef.value) return
    const focusable = containerRef.value.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    if (!focusable.length) return
    const first = focusable[0], last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }
  function activate() {
    prev = document.activeElement
    document.addEventListener('keydown', handler)
    nextTick(() => {
      const first = containerRef.value?.querySelector('button, a[href]')
      first?.focus()
    })
  }
  function deactivate() {
    document.removeEventListener('keydown', handler)
    if (prev) { prev.focus(); prev = null }
  }
  return { activate, deactivate }
}


/* ═══════════════════════════════════════════════════════
   State
   ═══════════════════════════════════════════════════════ */

const sectionRef = ref(null)
const featRef = ref(null)
const filtersRef = ref(null)
const statsRef = ref(null)
const modalRef = ref(null)
const modalBodyRef = ref(null)

const activeFilter = ref('All')
const sortBy = ref('featured')
const activeProject = ref(null)
const failedImages = reactive(new Set())

// Refs populated imperatively
const filterBtnEls = {}
const rowEls = {}

/* ═══════════════════════════════════════════════════════
   Data — identical shape to original
   ═══════════════════════════════════════════════════════ */

const projects = ref([
  {
    id: 1, slug: 'sellsync-pos', title: 'SellSync POS System',
    tagline: 'Multi-tenant SaaS point of sale built for the Kenyan retail market.',
    description: 'SellSync is a production-grade, multi-tenant Point of Sale platform built with Laravel 11 and PostgreSQL, live on Railway. Designed specifically for Kenyan SMEs, it consolidates inventory, sales analytics, branch management, and role-based access control into one cohesive system — replacing the fragmented spreadsheet workflows most local retailers depend on.',
    problem: 'Kenyan SMEs lose thousands of shillings monthly to stock discrepancies, manual reconciliation errors, and the absence of real-time sales visibility across branches.',
    solution: 'A cloud-native POS with per-tenant data isolation, a cashier-optimised touch interface, live inventory deductions, and branch-level reporting — deployable via a single Railway URL with zero infrastructure overhead.',
    category: 'Full Stack · SaaS', icon: '⚡', image: './sellsync-dashboard.png',
    status: 'live', impact: 'SaaS',
    github: 'https://github.com/Njenga993/pos-project',
    demo: 'https://sellsync-pos-production.up.railway.app/',
    stack: ['Laravel 11', 'PostgreSQL', 'Vue.js', 'Tailwind CSS', 'Railway', 'PHP'],
    metrics: [
      { value: '40%', label: 'Faster checkout' },
      { value: 'Multi', label: 'Tenant isolation' },
      { value: 'Real-time', label: 'Stock updates' },
      { value: '99.9%', label: 'Uptime on Railway' },
    ],
    features: [
      'Multi-tenant architecture with complete data isolation per business',
      'Role-based access control — Super Admin, Branch Manager, Cashier',
      'Live inventory deductions on every sale with low-stock alerts',
      'Branch management with per-branch sales and stock reports',
      'Supplier and expense management modules',
      'Daily, weekly, and monthly analytics dashboard',
      'Receipt generation with customisable business branding',
    ],
  },
  {
    id: 2, slug: 'nyakazi-ecommerce', title: 'Nyakazi Organics',
    tagline: 'E-commerce platform reconnecting Kenyans with indigenous solar-dried vegetables.',
    description: 'A full-featured Next.js e-commerce storefront for Nyakazi Organics — a Kenyan brand selling solar-dried indigenous vegetables. The platform handles product discovery, cart management, and WhatsApp-native order processing, meeting customers exactly where they already transact in the Kenyan market.',
    problem: 'Indigenous Kenyan vegetables are disappearing from urban tables because there was no modern, accessible channel connecting rural producers to city consumers who actively want them.',
    solution: 'A performant Next.js storefront with a curated product catalog, WhatsApp checkout integration formatted for Kenyan ordering habits, and SEO optimised for "African vegetables Kenya" search intent.',
    category: 'E-commerce', icon: '🌿', image: './Ecommerc.png',
    status: 'live', impact: 'Live',
    github: 'https://github.com/Njenga993/nyakazi-ecommerce-',
    demo: 'https://nyakazi.org/',
    stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'WhatsApp API'],
    metrics: [
      { value: '95+', label: 'Lighthouse score' },
      { value: 'WhatsApp', label: 'Native checkout' },
      { value: 'Mobile-first', label: 'Design approach' },
      { value: 'SEO', label: 'Optimised for Kenya' },
    ],
    features: [
      'Mobile-first product catalog with high-quality photography layout',
      'WhatsApp order message auto-formatter for frictionless checkout',
      'Product search and category filtering',
      'Persistent cart with localStorage state management',
      'SEO metadata, Open Graph, and structured data for search visibility',
      'Responsive design tested across low-end Android devices common in Kenya',
    ],
  },
  {
    id: 3, slug: 'seed-savers-network', title: 'Seed Savers Network Kenya',
    tagline: "Digital platform for East Africa's indigenous seed sovereignty movement.",
    description: 'A React + TypeScript website for Seed Savers Network Kenya — an NGO working to preserve indigenous seed varieties and promote food sovereignty across East Africa. The site serves as the primary digital face for the organisation, hosting their programs, events, resource library, and the EA-ISC 2026 Conference.',
    problem: 'The Seed Savers Network had no unified digital presence capable of serving their diverse stakeholders — farmers, researchers, partner NGOs, and international donors — with consistent, accessible information.',
    solution: 'A component-driven React site with clearly structured program pages, an events system for the EA-ISC 2026 Conference, a multilingual-ready resource library, and donation pathways optimised for both local M-Pesa and international payment flows.',
    category: 'Web Development', icon: '🌱', image: './ssn.PNG',
    status: 'live', impact: 'NGO',
    github: 'https://github.com/Njenga993/SeedSavers',
    demo: 'https://seedsaverskenya.org/',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'HTML5'],
    metrics: [
      { value: 'EA-ISC', label: '2026 Conference hub' },
      { value: 'Multi', label: 'Stakeholder design' },
      { value: 'Fast', label: 'Vite build pipeline' },
      { value: 'AA', label: 'Accessibility compliant' },
    ],
    features: [
      'Program and project pages with structured impact reporting',
      'EA-ISC 2026 Conference section with registration and partner info',
      'News and events module with category filtering',
      'Resource library for seed saving guides and research papers',
      'Donation flow with M-Pesa and card payment pathways',
      'SEO-optimised for both English and Swahili search queries',
      'Performance-tuned for low-bandwidth rural internet connections',
    ],
  },
  {
  id: 4,
  slug: 'ea-indigenous-seed-conference',
  title: 'Eastern Africa Indigenous Seed Conference Platform',
  tagline: 'A comprehensive conference management platform powering the 1st Eastern Africa Indigenous Seed Conference.',
  description: 'A modern full-stack conference website and event management platform developed for the 1st Eastern Africa Indigenous Seed Conference (EA-ISC 2026). The platform serves as the digital hub for one of Eastern Africa’s largest gatherings on indigenous seeds, farmer-managed seed systems, biodiversity conservation, and seed sovereignty. It provides conference information, online registration, abstract submission, programme management, speaker profiling, sponsorship opportunities, exhibition management, news publishing, and participant engagement through an intuitive, mobile-first experience.',

  problem: 'Large regional conferences often rely on disconnected tools for registrations, abstract submissions, programme updates, exhibitor management, and communication. This creates administrative overhead, fragmented participant experiences, duplicated data, and difficulty managing hundreds of stakeholders including researchers, farmers, policymakers, civil society organisations, exhibitors, sponsors, and development partners.',

  solution: 'Developed a centralized conference management platform that streamlines participant registration, call for abstracts, programme publication, speaker management, exhibitor showcases, sponsor visibility, event communications, and resource sharing within a single responsive web application. The platform enables organizers to efficiently manage the conference lifecycle while providing attendees with a seamless digital experience before, during, and after the event.',

  category: 'Event Management',
  icon: '🌱',
  image: './conference.png',

  status: 'live',
  impact: 'Regional Conference Platform',

  github: '#',
  demo: 'https://eaindigenousseedconference.org/',

  stack: [
    'React',
    'TypeScript',
    'Laravel',
    'MySQL',
    'REST API',
    'HTML5',
    'CSS3',
    'JavaScript',
    'Responsive Design'
  ],

  metrics: [
    { value: '1st', label: 'Regional Conference' },
    { value: '6', label: 'Conference Themes' },
    { value: '100%', label: 'Mobile Responsive' },
    { value: 'Multi-role', label: 'Content Management' },
  ],

  features: [
    'Comprehensive conference information portal with dynamic content management',
    'Online participant registration with streamlined attendee onboarding',
    'Call for abstracts and paper submission workflows',
    'Scientific programme publication with sessions, tracks, and schedules',
    'Speaker profiles showcasing researchers, practitioners, and community leaders',
    'Exhibitor and partner showcase pages highlighting innovations and organizations',
    'Sponsor visibility through dedicated sponsorship sections and branding opportunities',
    'News and announcements management for conference updates',
    'Event countdown and important conference milestones',
    'Responsive navigation optimized for desktop, tablet, and mobile devices',
    'Dedicated pages for conference themes, objectives, and expected outcomes',
    'Information hub covering farmer-managed seed systems, seed sovereignty, agroecology, biodiversity conservation, indigenous knowledge systems, and climate resilience',
    'Integrated contact forms for participant enquiries and partnership requests',
    'Resource centre for conference documents, publications, and important downloads',
    'Venue information with logistics, accommodation, and travel guidance',
    'Committee and organizing team profiles',
    'Partner and supporting organization directory',
    'SEO-optimized architecture for increased regional and international visibility',
    'Accessibility-focused user interface for diverse audiences',
    'CMS-powered content management enabling organizers to publish updates without developer intervention'
  ],
},
  {
    id: 5, slug: 'elixir-biotech', title: 'Elixir Biotech',
    tagline: 'React/TypeScript website for a Nairobi clean energy startup.',
    description: 'A premium React + TypeScript marketing and product site for Elixir Biotech, a Nairobi-based clean energy company developing biogas and waste-to-energy systems for the East African market. The build focuses on editorial authority, scroll-reveal storytelling, and SEO structured data to attract B2B clients and impact investors.',
    problem: 'Elixir Biotech had a compelling product but no digital presence that matched their ambition. Their old site undermined investor confidence and failed to articulate the economic case for biogas adoption to Kenyan agribusinesses.',
    solution: 'A full UI overhaul across all sections with IntersectionObserver scroll animations, JSON-LD structured data, and pre-rendering via vite-plugin-prerender to maximise SEO for clean energy search terms in East Africa.',
    category: 'Frontend', icon: '🔋', image: './elixbiotech.png',
    status: 'live', impact: 'Clean Energy',
    github: 'https://github.com/Njenga993',
    demo: 'https://elixirbiotech.co.ke/',
    stack: ['React', 'TypeScript', 'Vite', 'CSS3', 'React Helmet', 'JSON-LD'],
    metrics: [
      { value: 'SEO', label: 'Structured data markup' },
      { value: 'GSAP', label: 'Scroll animations' },
      { value: 'AA', label: 'Accessibility standard' },
      { value: 'SSG', label: 'Pre-rendered pages' },
    ],
    features: [
      'Full-bleed hero with dark overlay and scroll-triggered content reveal',
      'IntersectionObserver scroll animations across all sections',
      'JSON-LD structured data for Product, Organization, and FAQ schemas',
      'Pre-rendering via vite-plugin-prerender for SEO-ready static output',
      'React Helmet Async for per-page meta, OG tags, and canonical URLs',
      'Product section with technical specifications and impact metrics',
      'Contact form with form validation and WhatsApp fallback integration',
    ],
  },
])


/* ═══════════════════════════════════════════════════════
   Computed
   ═══════════════════════════════════════════════════════ */

const categories = computed(() => ['All', ...new Set(projects.value.map(p => p.category))])

const filteredSorted = computed(() => {
  let list = activeFilter.value === 'All'
    ? [...projects.value]
    : projects.value.filter(p => p.category === activeFilter.value)
  if (sortBy.value === 'live') list.sort((a, b) => (b.status === 'live' ? 1 : 0) - (a.status === 'live' ? 1 : 0))
  return list
})

const featured = computed(() => filteredSorted.value[0] || projects.value[0])
const liveCount = computed(() => projects.value.filter(p => p.status === 'live').length)
const totalTech = computed(() => { const s = new Set(); projects.value.forEach(p => p.stack.forEach(t => s.add(t))); return s.size })

const currentIdx = computed(() => activeProject.value ? projects.value.findIndex(p => p.id === activeProject.value.id) : -1)
const prevProject = computed(() => currentIdx.value > 0 ? projects.value[currentIdx.value - 1] : null)
const nextProject = computed(() => currentIdx.value < projects.value.length - 1 ? projects.value[currentIdx.value + 1] : null)

const getCount = (cat) => cat === 'All' ? projects.value.length : projects.value.filter(p => p.category === cat).length

// Filter indicator — measures real DOM positions
const indicatorStyle = computed(() => {
  const btn = filterBtnEls[activeFilter.value]
  if (!btn) return { opacity: 0, width: '0px', transform: 'translateX(0px)' }
  return {
    width: btn.offsetWidth + 'px',
    transform: `translateX(${btn.offsetLeft}px)`,
    opacity: 1,
  }
})


/* ═══════════════════════════════════════════════════════
   Featured card — mouse-tracking spotlight + 3D tilt
   ═══════════════════════════════════════════════════════ */

function onFeatMove(e) {
  const el = featRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  el.style.setProperty('--rx', `${y * -4}deg`)
  el.style.setProperty('--ry', `${x * 4}deg`)
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  el.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

function onFeatLeave() {
  const el = featRef.value
  if (!el) return
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
}


/* ═══════════════════════════════════════════════════════
   Row spotlight — per-row mouse glow
   ═══════════════════════════════════════════════════════ */

function onRowMove(e, id) {
  const el = rowEls[id]
  if (!el) return
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  el.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

function onRowLeave(id) {
  const el = rowEls[id]
  if (el) {
    el.style.removeProperty('--mx')
    el.style.removeProperty('--my')
  }
}


/* ═══════════════════════════════════════════════════════
   Modal
   ═══════════════════════════════════════════════════════ */

const focusTrap = useFocusTrap(modalRef)

function openModal(project) {
  activeProject.value = project
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  activeProject.value = null
  document.body.style.overflow = ''
}

function navigate(dir) {
  const target = dir === 'prev' ? prevProject.value : nextProject.value
  if (target) activeProject.value = target
}

// Reset scroll + activate trap when modal project changes
watch(activeProject, (val) => {
  if (val) {
    nextTick(() => {
      if (modalBodyRef.value) modalBodyRef.value.scrollTop = 0
      focusTrap.activate()
    })
  } else {
    focusTrap.deactivate()
  }
})


/* ═══════════════════════════════════════════════════════
   Keyboard
   ═══════════════════════════════════════════════════════ */

function onKey(e) {
  if (!activeProject.value) return
  if (e.key === 'Escape') closeModal()
  if (e.key === 'ArrowLeft' && prevProject.value) navigate('prev')
  if (e.key === 'ArrowRight' && nextProject.value) navigate('next')
}


/* ═══════════════════════════════════════════════════════
   Scroll helpers
   ═══════════════════════════════════════════════════════ */

function scrollToContact() {
  const el = document.getElementById('contact')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}


/* ═══════════════════════════════════════════════════════
   Animated stat counters
   ═══════════════════════════════════════════════════════ */

const cProjects = useCounter(projects.value.length)
const cLive = useCounter(liveCount.value)
const cTech = useCounter(totalTech.value)
const cIndustries = useCounter(4)

const displayedCounts = computed(() => ({
  projects: cProjects.current.value,
  live: cLive.current.value,
  tech: cTech.current.value,
  industries: cIndustries.current.value,
}))

let statsTriggered = false
function maybeStartCounters() {
  if (statsTriggered) return
  statsTriggered = true
  cProjects.start()
  cLive.start()
  cTech.start()
  cIndustries.start()
}


/* ═══════════════════════════════════════════════════════
   Lifecycle
   ═══════════════════════════════════════════════════════ */

useReveal(sectionRef)

onMounted(() => {
  document.addEventListener('keydown', onKey)

  // Observe stats section to trigger counters
  if (statsRef.value) {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { maybeStartCounters(); io.unobserve(entry.target) }
    }, { threshold: 0.3 })
    io.observe(statsRef.value)
  }

  // Re-observe .reveal elements after filter changes (new elements)
  const observer = new MutationObserver(() => {
    if (!sectionRef.value) return
    const io2 = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io2.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    sectionRef.value.querySelectorAll('.reveal:not(.revealed)').forEach(el => io2.observe(el))
  })
  if (sectionRef.value) observer.observe(sectionRef.value, { childList: true, subtree: true })
  onUnmounted(() => observer.disconnect())
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
  cProjects.stop(); cLive.stop(); cTech.stop(); cIndustries.stop()
})
</script>


<style scoped>
/* ═══════════════════════════════════════════════════════
   BASE
   ═══════════════════════════════════════════════════════ */
.proj {
  --accent: #ff5500;
  --accent-h: #ff6b1a;
  --bg: #0a0a0b;
  --surface: rgba(255,255,255,0.025);
  --border: rgba(255,255,255,0.07);
  --border-h: rgba(255,85,0,0.3);
  --t1: #f0f0f0;
  --t2: #8a929e;
  --t3: #5a6270;
  --green: #22c55e;
  --amber: #f59e0b;
  --font: 'Inter', system-ui, -apple-system, sans-serif;
  --mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', ui-monospace, monospace;

  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(64px, 10vh, 120px) clamp(20px, 4vw, 80px) clamp(48px, 6vh, 80px);
  font-family: var(--font);
  display: flex;
  flex-direction: column;
  gap: clamp(24px, 3.5vh, 44px);
  color: var(--t2);
}


/* ═══════════════════════════════════════════════════════
   REVEAL SYSTEM — per-element IntersectionObserver
   ═══════════════════════════════════════════════════════ */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
              transform 0.7s cubic-bezier(0.16,1,0.3,1);
  transition-delay: var(--d, 0s);
}
.revealed {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal, .mi { transition-duration: 0.01ms !important; opacity: 1 !important; transform: none !important; }
  .feat { transition: none !important; }
  .proj-row { transition: none !important; }
}


/* ═══════════════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════════════ */
.proj-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}
.proj-head__left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.proj-head__line {
  width: 28px;
  height: 1px;
  background: var(--accent);
}
.proj-head__label {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.proj-head__right {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}
.proj-head__live {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.9rem;
  border: 1px solid rgba(255,85,0,0.2);
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--accent);
  background: rgba(255,85,0,0.05);
}
.dot {
  width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
}
.dot--live {
  background: var(--green);
  box-shadow: 0 0 6px rgba(34,197,94,0.7);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.proj-head__gh {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--t3);
  text-decoration: none;
  transition: all 0.25s ease;
}
.proj-head__gh:hover {
  border-color: var(--border-h);
  color: var(--accent);
}


/* ═══════════════════════════════════════════════════════
   FEATURED CARD
   ═══════════════════════════════════════════════════════ */
.feat {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transform: perspective(1200px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform 0.2s ease-out;
  will-change: transform;
  outline: none;
}
.feat:focus-visible {
  box-shadow: 0 0 0 2px var(--accent);
}

/* Transition for filter switch */
.feat-enter-active, .feat-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.feat-enter-from { opacity: 0; transform: perspective(1200px) scale(0.97) translateY(12px); }
.feat-leave-to { opacity: 0; transform: perspective(1200px) scale(1.01) translateY(-8px); }

.feat__bg {
  position: absolute;
  inset: 0;
}
.feat__bg img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: grayscale(80%) brightness(0.55);
  transition: filter 0.6s ease, transform 0.6s ease;
}
.feat:hover .feat__bg img {
  filter: grayscale(30%) brightness(0.65);
  transform: scale(1.04);
}
.feat__fallback {
  width: 100%; height: 100%;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 0.75rem;
  background: linear-gradient(135deg, #08090a, #0f1318);
}
.feat__fallback-icon { font-size: 4rem; opacity: 0.15; }
.feat__fallback-name { font-size: 0.9rem; font-weight: 700; color: rgba(255,255,255,0.1); }

.feat__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10,10,11,0.3) 0%,
    rgba(10,10,11,0.55) 50%,
    rgba(10,10,11,0.92) 100%
  );
}
.feat__glow {
  position: absolute; inset: 0;
  background: radial-gradient(
    550px circle at var(--mx, 50%) var(--my, 50%),
    rgba(255,85,0,0.08),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
}
.feat:hover .feat__glow { opacity: 1; }

.feat__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: clamp(320px, 48vh, 480px);
  padding: clamp(1.2rem, 2.5vw, 2rem) clamp(1.5rem, 3vw, 2.5rem);
}
.feat__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.feat__num {
  font-size: 0.72rem;
  font-weight: 800;
  color: rgba(255,255,255,0.15);
  letter-spacing: 0.08em;
  font-family: var(--mono);
}
.feat__status {
  font-size: 0.68rem;
  font-weight: 700;
  font-family: var(--mono);
  letter-spacing: 0.04em;
}
.feat__status.live { color: var(--green); }
.feat__status.development { color: var(--amber); }

.feat__mid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 600px;
}
.feat__cat {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.feat__title {
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--t1);
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin: 0;
}
.feat__tag {
  font-size: clamp(0.82rem, 1.2vw, 0.95rem);
  color: var(--t2);
  line-height: 1.6;
  margin: 0;
}

.feat__bot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}
.feat__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.feat__stack span {
  padding: 0.25rem 0.65rem;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 600;
  color: rgba(255,255,255,0.6);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.feat__explore {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--t1);
  letter-spacing: 0.04em;
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s;
}
.feat:hover .feat__explore {
  opacity: 1;
  transform: translateX(0);
}
.feat__explore svg {
  transition: transform 0.25s ease;
}
.feat:hover .feat__explore svg {
  transform: translateX(4px);
}


/* ═══════════════════════════════════════════════════════
   FILTERS
   ═══════════════════════════════════════════════════════ */
.proj-filters {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding-bottom: 0.5rem;
}
.proj-filters__btn {
  position: relative;
  padding: 0.45rem 0.9rem;
  background: none;
  border: none;
  font-family: var(--font);
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--t3);
  cursor: pointer;
  transition: color 0.25s ease;
  z-index: 1;
}
.proj-filters__btn:hover { color: var(--t2); }
.proj-filters__btn.active { color: var(--t1); }
.proj-filters__cnt {
  font-size: 0.6rem;
  opacity: 0.5;
  margin-left: 0.2rem;
}
.proj-filters__bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--accent);
  border-radius: 1px;
  transition: width 0.35s cubic-bezier(0.16,1,0.3,1),
              transform 0.35s cubic-bezier(0.16,1,0.3,1),
              opacity 0.25s ease;
}


/* ═══════════════════════════════════════════════════════
   PROJECT ROWS — the key layout differentiator
   ═══════════════════════════════════════════════════════ */
.proj-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.proj-row {
  display: grid;
  grid-template-columns: 40px 110px 1fr auto;
  gap: clamp(0.75rem, 1.5vw, 1.25rem);
  align-items: center;
  padding: 0.85rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  cursor: pointer;
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  outline: none;
  position: relative;
  overflow: hidden;
}
.proj-row::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(
    350px circle at var(--mx, -200px) var(--my, -200px),
    rgba(255,85,0,0.035),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
.proj-row:hover::before { opacity: 1; }
.proj-row:hover {
  border-color: var(--border-h);
  background: rgba(255,255,255,0.035);
  transform: translateX(4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
}
.proj-row:focus-visible {
  box-shadow: 0 0 0 2px var(--accent);
}

/* Number */
.proj-row__num {
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--t3);
  font-family: var(--mono);
  transition: color 0.25s ease;
}
.proj-row:hover .proj-row__num { color: var(--accent); }

/* Thumbnail */
.proj-row__thumb {
  position: relative;
  width: 110px;
  aspect-ratio: 16 / 10;
  border-radius: 10px;
  overflow: hidden;
  background: linear-gradient(135deg, #0c0d0e, #12141a);
  flex-shrink: 0;
}
.proj-row__thumb img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: grayscale(100%) brightness(0.7);
  transition: filter 0.4s ease, transform 0.4s ease;
}
.proj-row:hover .proj-row__thumb img {
  filter: grayscale(30%) brightness(0.85);
  transform: scale(1.08);
}
.proj-row__thumb-fb {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.8rem; opacity: 0.2;
}

/* Info */
.proj-row__info {
  min-width: 0;
}
.proj-row__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}
.proj-row__cat {
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.proj-row__impact {
  font-size: 0.56rem;
  font-weight: 600;
  color: var(--t3);
  padding: 0.12rem 0.45rem;
  border: 1px solid var(--border);
  border-radius: 999px;
}
.proj-row__title {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--t1);
  margin: 0 0 0.15rem;
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.proj-row__tag {
  font-size: 0.74rem;
  color: var(--t3);
  line-height: 1.5;
  margin: 0 0 0.45rem;
  display: -webkit-box;
  --webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.proj-row__techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}
.proj-row__techs span {
  padding: 0.18rem 0.5rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 999px;
  font-size: 0.6rem;
  color: var(--t3);
  white-space: nowrap;
}
.proj-row__more {
  color: var(--accent) !important;
  font-weight: 700;
  border-color: transparent !important;
  background: none !important;
}

/* End: status + arrow */
.proj-row__end {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-shrink: 0;
}
.proj-row__dot {
  width: 7px; height: 7px; border-radius: 50%;
}
.proj-row__dot.live { background: var(--green); box-shadow: 0 0 6px rgba(34,197,94,0.6); animation: pulse 2s infinite; }
.proj-row__dot.development { background: var(--amber); box-shadow: 0 0 6px rgba(245,158,11,0.5); }
.proj-row__arrow {
  color: var(--t3);
  transition: color 0.25s ease, transform 0.25s ease;
}
.proj-row:hover .proj-row__arrow {
  color: var(--accent);
  transform: translateX(4px);
}


/* ═══════════════════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════════════════ */
.proj-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
  padding: 1.6rem 1.8rem;
  border-radius: 18px;
  position: relative;
  overflow: hidden;
  background: rgba(255,85,0,0.03);
  border: 1px solid rgba(255,85,0,0.12);
}
.proj-cta::before {
  content: '';
  position: absolute;
  top: 0; right: 0;
  width: 45%; height: 100%;
  background: radial-gradient(ellipse at 85% 50%, rgba(255,85,0,0.07) 0%, transparent 70%);
  pointer-events: none;
}
.proj-cta__text { position: relative; z-index: 1; }
.proj-cta__text h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--t1);
  margin: 0 0 0.25rem;
}
.proj-cta__text p {
  font-size: 0.82rem;
  color: var(--t2);
  margin: 0;
  line-height: 1.6;
}
.proj-cta__btn {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.75rem 1.6rem;
  background: var(--accent);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(255,85,0,0.2);
}
.proj-cta__btn:hover {
  background: var(--accent-h);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255,85,0,0.35);
}
.proj-cta__btn-icon {
  width: 22px; height: 22px;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.3s ease;
}
.proj-cta__btn:hover .proj-cta__btn-icon { transform: translateX(3px); }


/* ═══════════════════════════════════════════════════════
   STATS STRIP
   ═══════════════════════════════════════════════════════ */
.proj-stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.2rem;
  padding-top: clamp(20px, 3.5vh, 36px);
  border-top: 1px solid var(--border);
}
.proj-stats__items {
  display: flex;
  align-items: center;
  gap: 1.3rem;
}
.proj-stats__item {
  display: flex;
  flex-direction: column;
  gap: 0.08rem;
}
.proj-stats__num {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: -0.02em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.proj-stats__label {
  font-size: 0.6rem;
  color: var(--t3);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.proj-stats__div {
  width: 1px;
  height: 1.8rem;
  background: var(--border);
  flex-shrink: 0;
}
.proj-stats__socials {
  display: flex;
  gap: 0.45rem;
}
.proj-stats__soc {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--t3);
  text-decoration: none;
  transition: all 0.25s ease;
}
.proj-stats__soc:hover {
  border-color: var(--border-h);
  color: var(--accent);
  transform: translateY(-2px);
}


/* ═══════════════════════════════════════════════════════
   MODAL
   ═══════════════════════════════════════════════════════ */
.modal-enter-active, .modal-leave-active { transition: opacity 0.28s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }

.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.82);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
}

.modal__close {
  position: fixed;
  top: 1rem; right: 1rem;
  z-index: 2100;
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(10,10,11,0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--border-h);
  border-radius: 50%;
  color: var(--t2);
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px rgba(0,0,0,0.5);
}
.modal__close:hover {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

.modal {
  width: 100%;
  max-width: 1060px;
  height: calc(100vh - 2.5rem);
  max-height: 780px;
  background: #111113;
  border: 1px solid rgba(255,85,0,0.12);
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0,0,0,0.7);
  animation: modalIn 0.35s cubic-bezier(0.16,1,0.3,1) both;
}
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.96) translateY(16px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Visual panel */
.modal__vis {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #07080a, #0d1118);
}
.vis-fade-enter-active, .vis-fade-leave-active { transition: opacity 0.2s ease; }
.vis-fade-enter-from, .vis-fade-leave-to { opacity: 0; }

.modal__vis-img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
}
.modal__vis-fb {
  width: 100%; height: 100%;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 0.75rem;
  background: linear-gradient(135deg, #07080a, #0d1118);
}
.modal__vis-fb-icon { font-size: 4.5rem; opacity: 0.12; }
.modal__vis-fb-name { font-size: 0.95rem; font-weight: 700; color: rgba(255,255,255,0.1); text-align: center; padding: 0 1.5rem; }

.modal__vis-grad {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(17,17,19,1) 0%, transparent 45%, transparent 70%, rgba(17,17,19,0.5) 100%);
  pointer-events: none;
}
.modal__vis-info {
  position: absolute;
  bottom: 1.25rem; left: 1.25rem; right: 1.25rem;
  display: flex; flex-direction: column; gap: 0.6rem;
}
.modal__vis-status {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  border: 1px solid;
  background: rgba(10,10,11,0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  width: fit-content;
  font-family: var(--mono);
}
.modal__vis-status.live { color: var(--green); border-color: rgba(34,197,94,0.35); }
.modal__vis-status.development { color: var(--amber); border-color: rgba(245,158,11,0.35); }
.ms-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: currentColor;
  animation: pulse 2s infinite;
}
.modal__vis-links { display: flex; gap: 0.45rem; flex-wrap: wrap; }
.modal__vis-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.42rem 0.9rem;
  font-size: 0.72rem;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  letter-spacing: 0.03em;
  transition: all 0.25s ease;
}
.modal__vis-link--primary {
  background: var(--accent);
  color: #fff;
}
.modal__vis-link--primary:hover {
  background: var(--accent-h);
  transform: translateY(-1px);
}
.modal__vis-link--ghost {
  background: rgba(10,10,11,0.8);
  color: var(--t2);
  border: 1px solid var(--border);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.modal__vis-link--ghost:hover {
  border-color: var(--border-h);
  color: var(--accent);
}
.modal__vis-wm {
  position: absolute;
  top: 0.8rem; left: 1rem;
  font-size: 4.5rem;
  font-weight: 900;
  color: rgba(255,255,255,0.025);
  line-height: 1;
  pointer-events: none;
  font-family: var(--mono);
}

/* Scrollable body */
.modal__body {
  overflow-y: auto;
  overflow-x: hidden;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.08) transparent;
}
.modal__body::-webkit-scrollbar { width: 5px; }
.modal__body::-webkit-scrollbar-track { background: transparent; }
.modal__body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }

/* Staggered item animation */
.mi {
  opacity: 0;
  transform: translateY(12px);
  animation: miIn 0.45s cubic-bezier(0.16,1,0.3,1) both;
  animation-delay: var(--mi, 0s);
}
@keyframes miIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal__cat {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.modal__title {
  font-size: clamp(1.4rem, 2.5vw, 1.8rem);
  font-weight: 800;
  color: var(--t1);
  margin: 0.35rem 0 0.3rem;
  line-height: 1.15;
  letter-spacing: -0.02em;
}
.modal__tagline {
  font-size: 0.88rem;
  color: var(--t2);
  line-height: 1.55;
  margin: 0;
}
.modal__desc {
  font-size: 0.84rem;
  color: var(--t2);
  line-height: 1.75;
  margin: 0;
}

/* Problem / Solution */
.modal__ps {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}
.modal__block {
  padding: 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
}
.modal__block-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--t1);
  letter-spacing: 0.04em;
}
.modal__block-dot {
  width: 8px; height: 8px; border-radius: 50%;
}
.modal__block-dot--prob { background: #ef4444; }
.modal__block-dot--sol { background: var(--green); }
.modal__block p {
  font-size: 0.78rem;
  color: var(--t2);
  line-height: 1.65;
  margin: 0;
}

/* Metrics */
.modal__sec-label {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--t1);
  letter-spacing: 0.04em;
  margin-bottom: 0.7rem;
}
.modal__sec-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent);
}
.modal__metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}
.modal__metric {
  padding: 0.85rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.modal__metric-val {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: -0.02em;
}
.modal__metric-label {
  font-size: 0.65rem;
  color: var(--t3);
}

/* Features */
.modal__feat-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.modal__feat-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  font-size: 0.78rem;
  color: var(--t2);
  line-height: 1.55;
}
.modal__feat-list li svg {
  flex-shrink: 0;
  margin-top: 3px;
  color: var(--green);
}

/* Stack pills */
.modal__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.modal__pill {
  padding: 0.3rem 0.7rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--t2);
  transition: border-color 0.2s ease, color 0.2s ease;
}
.modal__pill:hover {
  border-color: var(--border-h);
  color: var(--accent);
}

/* Nav */
.modal__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.8rem;
  border-top: 1px solid var(--border);
  margin-top: 0.4rem;
}
.modal__nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.9rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-family: var(--font);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--t2);
  cursor: pointer;
  transition: all 0.25s ease;
}
.modal__nav-btn:hover:not(:disabled) {
  border-color: var(--border-h);
  color: var(--accent);
}
.modal__nav-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}
.modal__nav-counter {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--t3);
  font-family: var(--mono);
}
.modal__nav-sep {
  margin: 0 0.15rem;
  color: var(--border);
}


/* ═══════════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════════ */

/* Tablet: rows become more compact */
@media (max-width: 860px) {
  .proj-row {
    grid-template-columns: 32px 85px 1fr auto;
    gap: 0.65rem;
    padding: 0.7rem 0.85rem;
  }
  .modal {
    grid-template-columns: 1fr;
    max-height: 90vh;
    height: auto;
  }
  .modal__vis {
    height: 220px;
    min-height: 180px;
  }
  .modal__ps {
    grid-template-columns: 1fr;
  }
}

/* Mobile: rows stack, modal full screen */
@media (max-width: 640px) {
  .proj {
    padding-left: 16px;
    padding-right: 16px;
  }
  .proj-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.65rem;
  }
  .feat__content {
    min-height: 280px;
    padding: 1rem 1.15rem;
  }
  .feat__title {
    font-size: 1.5rem;
  }

  .proj-row {
    grid-template-columns: 1fr 28px;
    grid-template-rows: auto auto;
    gap: 0 0.5rem;
    padding: 0.75rem;
    border-radius: 14px;
  }
  .proj-row__num { display: none; }
  .proj-row__thumb {
    width: 100%;
    aspect-ratio: 16 / 9;
    grid-column: 1 / -1;
    order: -1;
    border-radius: 10px;
  }
  .proj-row__info { grid-column: 1; }
  .proj-row__end {
    grid-column: 2;
    grid-row: 2;
    flex-direction: column;
    gap: 0.3rem;
  }
  .proj-row__tag { --webkit-line-clamp: 2; }

  .modal-overlay { padding: 0; }
  .modal {
    border-radius: 0;
    height: 100vh;
    max-height: 100vh;
    grid-template-columns: 1fr;
  }
  .modal__vis { height: 200px; }
  .modal__body { padding: 1.15rem; }
  .modal__metrics-grid { grid-template-columns: 1fr 1fr; }
  .modal__close { top: 0.65rem; right: 0.65rem; }

  .proj-cta {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.25rem;
  }
  .proj-stats {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>