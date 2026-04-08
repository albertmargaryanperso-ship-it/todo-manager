import type { Todo } from '@/types'

export const INITIAL_TODOS: Todo[] = [
  // Urgent
  { id: 8,  title: 'Ranger les documents',                            category: 'admin',   status: 'urgent',    createdAt: '2026-03-31' },
  { id: 32, title: 'Payer les 3 000€ Luxembourg bureaux',             category: 'pro',     status: 'urgent',    createdAt: '2026-04-05' },
  // À faire
  { id: 9,  title: 'Paiement maître VESIN et TABANI (200-500€)',      category: 'finance', status: 'todo',      createdAt: '2026-03-31' },
  { id: 11, title: 'Remboursement AFDAS EDEN HALLARD 6K',             category: 'finance', status: 'todo',      createdAt: '2026-03-31' },
  { id: 12, title: 'Paiement formation EDEN HALLARD 6K',              category: 'finance', status: 'todo',      createdAt: '2026-03-31' },
  { id: 13, title: 'Remboursement Macbook BOULANGER et FNAC 3K',      category: 'finance', status: 'todo',      createdAt: '2026-03-31' },
  { id: 15, title: 'Sinistre CONSTRUCTEL [1] et [2]',                 category: 'pro',     status: 'todo',      createdAt: '2026-03-31' },
  { id: 18, title: 'Remboursement assurance',                         category: 'finance', status: 'todo',      createdAt: '2026-03-31' },
  { id: 22, title: 'Confirmer le mail de Mme Kuman',                  category: 'pro',     status: 'todo',      createdAt: '2026-03-31' },
  // Délégué
  { id: 24, title: 'Adel 69 St Priest — envoi email → Adel',          category: 'pro',     status: 'delegated', createdAt: '2026-03-31', assignee: 'Adel' },
  { id: 25, title: 'Tech Bourg-en-Bresse — kangoo + nacelle → Tech',  category: 'pro',     status: 'delegated', createdAt: '2026-03-31', assignee: 'Tech' },
  // En attente
  { id: 26, title: 'Centre de formation (CALLA, KCR, WhatsApp)',       category: 'pro',     status: 'waiting',   createdAt: '2026-03-31' },
  { id: 27, title: 'Trier tous les espaces de mon PC',                 category: 'admin',   status: 'waiting',   createdAt: '2026-03-31' },
  { id: 28, title: 'Dettes UENDI 8000€ en dehors SEB',                 category: 'finance', status: 'waiting',   createdAt: '2026-03-31' },
  { id: 29, title: 'Dettes JACK 2500€ avec récap Amaya',              category: 'finance', status: 'waiting',   createdAt: '2026-03-31' },
  // Terminées
  { id: 1,  title: 'Transfert techniciens CIRCET [BPU, Contrat STT, Att honneur]', category: 'pro',   status: 'done', createdAt: '2026-03-31', completedAt: '2026-04-04' },
  { id: 3,  title: 'Appeler Karen voir ce qui se passe + Ouss Makhlouf',           category: 'pro',   status: 'done', createdAt: '2026-03-31', completedAt: '2026-04-04' },
  { id: 4,  title: 'Appeler Seb voir ce qui se passe RDV demain',                  category: 'pro',   status: 'done', createdAt: '2026-03-31', completedAt: '2026-04-04' },
  { id: 5,  title: 'Appeler Kader',                                                category: 'pro',   status: 'done', createdAt: '2026-03-31', completedAt: '2026-04-04' },
  { id: 6,  title: 'Appeler Sabrina Karima et Shayma',                             category: 'pro',   status: 'done', createdAt: '2026-03-31', completedAt: '2026-04-04' },
  { id: 7,  title: 'Appeler Soufiane',                                              category: 'pro',   status: 'done', createdAt: '2026-03-31', completedAt: '2026-04-04' },
  { id: 10, title: 'Paiement bureau LUXEMBOURG',                                   category: 'finance', status: 'done', createdAt: '2026-03-31', completedAt: '2026-04-04' },
  { id: 14, title: 'Transférer mail perso → CCT (Loelia)',                         category: 'admin', status: 'done', createdAt: '2026-03-31', completedAt: '2026-04-04' },
  { id: 16, title: 'Erreur régul Yves SOUFIANE',                                   category: 'pro',   status: 'done', createdAt: '2026-03-31', completedAt: '2026-04-04' },
  { id: 17, title: 'Résiliation assurances véhicules',                             category: 'admin', status: 'done', createdAt: '2026-03-31', completedAt: '2026-04-04' },
  { id: 20, title: 'Vérifier fin de contrat Oussama chômage',                     category: 'pro',   status: 'done', createdAt: '2026-03-31', completedAt: '2026-04-04' },
  { id: 21, title: 'Vérifier date expiration attestation URSSAF CCT',              category: 'admin', status: 'done', createdAt: '2026-03-31', completedAt: '2026-04-04' },
  { id: 23, title: 'Mohand 73 — Fausse DPAE x2',                                  category: 'pro',   status: 'done', createdAt: '2026-03-31', completedAt: '2026-04-04' },
  { id: 2,  title: 'Appeler Mohand ou Omar salarié',                               category: 'pro',   status: 'done', createdAt: '2026-03-31', completedAt: '2026-03-31' },
  { id: 19, title: 'Connecter Obsidian à mon Drive et continuer le travail Drive + Claude', category: 'admin', status: 'done', createdAt: '2026-03-29', completedAt: '2026-03-29' },
]
