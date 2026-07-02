--
-- PostgreSQL database dump
--

\restrict xcA1cJ9blMij9krLzit1UA6zUDmaC0ECsIi9l9yYDn7ZWFKdcS70NS4jrkga4Ld

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: url; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.url (
    id integer NOT NULL,
    long_url text NOT NULL,
    short_url character varying(10) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    expires_at timestamp with time zone
);


ALTER TABLE public.url OWNER TO postgres;

--
-- Name: url_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.url_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.url_id_seq OWNER TO postgres;

--
-- Name: url_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.url_id_seq OWNED BY public.url.id;


--
-- Name: url id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url ALTER COLUMN id SET DEFAULT nextval('public.url_id_seq'::regclass);


--
-- Data for Name: url; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.url (id, long_url, short_url, created_at, expires_at) FROM stdin;
6	https://github.com/dashboard	GitHub	2026-06-09 19:18:20.801531+05:30	2026-06-10 19:18:20.801531+05:30
7	https://www.linkedin.com/in/priyanshu-upadhyay-76aa97323/	simrun	2026-06-09 19:20:18.874631+05:30	2026-06-10 19:20:18.874631+05:30
8	https://www.youtube.com/results?search_query=how+to+dockerize+an+application	docker	2026-06-09 19:22:55.760983+05:30	2026-06-10 19:22:55.760983+05:30
9	https://www.freecodecamp.org/news/how-to-dockerize-your-application-and-deploy-it/	gj	2026-06-09 19:27:07.388738+05:30	2026-06-10 19:27:07.388738+05:30
10	https://www.youtube.com/results?search_query=how+to+dockerize+an+application	tell	2026-06-09 19:39:06.002879+05:30	2026-06-10 19:39:06.002879+05:30
\.


--
-- Name: url_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.url_id_seq', 10, true);


--
-- Name: url unique_short_url; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT unique_short_url UNIQUE (short_url);


--
-- Name: url url_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT url_pkey PRIMARY KEY (id);


--
-- Name: url url_short_url_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT url_short_url_key UNIQUE (short_url);


--
-- Name: idx_expires_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_expires_at ON public.url USING btree (expires_at);


--
-- Name: idx_short_url; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_short_url ON public.url USING btree (short_url);


--
-- PostgreSQL database dump complete
--

\unrestrict xcA1cJ9blMij9krLzit1UA6zUDmaC0ECsIi9l9yYDn7ZWFKdcS70NS4jrkga4Ld

