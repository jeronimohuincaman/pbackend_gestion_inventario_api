--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Producto" (idproducto, codigo_interno, descripcion, precio, cantidad) FROM stdin;
\.


--
-- Data for Name: Rol; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Rol" (idrol, descripcion, superadmin, alta, baja, modificacion, consulta) FROM stdin;
1	superadmin	t	t	t	t	t
2	admin	f	t	t	t	t
3	user_common	f	f	f	f	t
\.


--
-- Data for Name: Usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Usuario" (idusuario, nombre_completo, email, password, idrol) FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
c5097bf8-b94e-47c7-9f49-7288c07fa75e	3b06c9b6ed5e14500f851ae5bb0c55364de59346a0b88f157b6339c43b65d74b	2024-11-08 18:35:09.050847+00	20241108183508_first_migration	\N	\N	2024-11-08 18:35:09.018732+00	1
\.


--
-- Name: Producto_idproducto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Producto_idproducto_seq"', 1, false);


--
-- Name: Rol_idrol_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Rol_idrol_seq"', 1, false);


--
-- Name: Usuario_idusuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Usuario_idusuario_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

