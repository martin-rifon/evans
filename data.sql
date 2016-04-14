--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.7
-- Dumped by pg_dump version 9.4.7
-- Started on 2016-04-14 09:26:12 UYT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

DROP DATABASE evans_test;
--
-- TOC entry 2062 (class 1262 OID 24922)
-- Name: evans_test; Type: DATABASE; Schema: -; Owner: martin
--

CREATE DATABASE evans_test WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE evans_test OWNER TO martin;

\connect evans_test

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 2063 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 1 (class 3079 OID 11895)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2065 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 177 (class 1259 OID 24943)
-- Name: images; Type: TABLE; Schema: public; Owner: martin; Tablespace: 
--

CREATE TABLE images (
    id integer NOT NULL,
    property_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    url text,
    alt_text character varying
);


ALTER TABLE images OWNER TO martin;

--
-- TOC entry 176 (class 1259 OID 24941)
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: martin
--

CREATE SEQUENCE images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE images_id_seq OWNER TO martin;

--
-- TOC entry 2066 (class 0 OID 0)
-- Dependencies: 176
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: martin
--

ALTER SEQUENCE images_id_seq OWNED BY images.id;


--
-- TOC entry 175 (class 1259 OID 24932)
-- Name: properties; Type: TABLE; Schema: public; Owner: martin; Tablespace: 
--

CREATE TABLE properties (
    id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    neighborhood character varying,
    address character varying,
    description character varying,
    price_currency character varying,
    contact_telephone character varying,
    contact_from_time character varying,
    contact_to_time character varying,
    contact_email character varying,
    tiger_id integer,
    bedroom_amount integer,
    bathroom_amount integer,
    floor integer,
    floor_amount integer,
    contact_from_day integer,
    contact_to_day integer,
    lat numeric,
    lon numeric,
    price numeric,
    m2_built numeric,
    m2_not_built numeric,
    price_includes_shared_expenses boolean,
    has_garage boolean,
    shared_expenses numeric,
    contact_info_view_count integer DEFAULT 0,
    for_sale boolean DEFAULT false,
    for_rent boolean DEFAULT true,
    property_type character varying DEFAULT 'apartment'::character varying
);


ALTER TABLE properties OWNER TO martin;

--
-- TOC entry 174 (class 1259 OID 24930)
-- Name: properties_id_seq; Type: SEQUENCE; Schema: public; Owner: martin
--

CREATE SEQUENCE properties_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE properties_id_seq OWNER TO martin;

--
-- TOC entry 2067 (class 0 OID 0)
-- Dependencies: 174
-- Name: properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: martin
--

ALTER SEQUENCE properties_id_seq OWNED BY properties.id;


--
-- TOC entry 173 (class 1259 OID 24923)
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: martin; Tablespace: 
--

CREATE TABLE schema_migrations (
    version character varying NOT NULL
);


ALTER TABLE schema_migrations OWNER TO martin;

--
-- TOC entry 1937 (class 2604 OID 24946)
-- Name: id; Type: DEFAULT; Schema: public; Owner: martin
--

ALTER TABLE ONLY images ALTER COLUMN id SET DEFAULT nextval('images_id_seq'::regclass);


--
-- TOC entry 1932 (class 2604 OID 24935)
-- Name: id; Type: DEFAULT; Schema: public; Owner: martin
--

ALTER TABLE ONLY properties ALTER COLUMN id SET DEFAULT nextval('properties_id_seq'::regclass);


--
-- TOC entry 2057 (class 0 OID 24943)
-- Dependencies: 177
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: martin
--

INSERT INTO images (id, property_id, created_at, updated_at, url, alt_text) VALUES (1, 5, '2016-02-10 01:17:05.442305', '2016-02-10 01:17:05.442305', 'https://facebook.github.io/react/img/logo_og.png', 'React');
INSERT INTO images (id, property_id, created_at, updated_at, url, alt_text) VALUES (2, 5, '2016-02-10 01:17:05.443763', '2016-02-10 01:17:05.443763', 'https://pbs.twimg.com/profile_images/2149314222/square.png', 'Angular');
INSERT INTO images (id, property_id, created_at, updated_at, url, alt_text) VALUES (23, 1, '2016-04-08 00:16:42.147349', '2016-04-08 00:16:42.147349', 'https://facebook.github.io/react/img/logo_og.png', 'React');
INSERT INTO images (id, property_id, created_at, updated_at, url, alt_text) VALUES (24, 1, '2016-04-08 00:16:42.151722', '2016-04-08 00:16:42.151722', 'https://pbs.twimg.com/profile_images/2149314222/square.png', 'Angular');
INSERT INTO images (id, property_id, created_at, updated_at, url, alt_text) VALUES (31, 8, '2016-04-14 04:17:55.757636', '2016-04-14 04:17:55.757636', 'https://facebook.github.io/react/img/logo_og.png', 'React');
INSERT INTO images (id, property_id, created_at, updated_at, url, alt_text) VALUES (32, 8, '2016-04-14 04:17:55.766108', '2016-04-14 04:17:55.766108', 'https://pbs.twimg.com/profile_images/2149314222/square.png', 'Angular');
INSERT INTO images (id, property_id, created_at, updated_at, url, alt_text) VALUES (33, 8, '2016-04-14 04:17:55.781236', '2016-04-14 04:17:55.781236', 'https://facebook.github.io/react/img/logo_og.png', 'React');
INSERT INTO images (id, property_id, created_at, updated_at, url, alt_text) VALUES (34, 8, '2016-04-14 04:17:55.78271', '2016-04-14 04:17:55.78271', 'https://facebook.github.io/react/img/logo_og.png', 'React');
INSERT INTO images (id, property_id, created_at, updated_at, url, alt_text) VALUES (35, 8, '2016-04-14 04:17:55.784262', '2016-04-14 04:17:55.784262', 'https://pbs.twimg.com/profile_images/2149314222/square.png', 'Angular');
INSERT INTO images (id, property_id, created_at, updated_at, url, alt_text) VALUES (36, 8, '2016-04-14 04:17:55.78535', '2016-04-14 04:17:55.78535', 'https://pbs.twimg.com/profile_images/2149314222/square.png', 'Angular');


--
-- TOC entry 2068 (class 0 OID 0)
-- Dependencies: 176
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: martin
--

SELECT pg_catalog.setval('images_id_seq', 36, true);


--
-- TOC entry 2055 (class 0 OID 24932)
-- Dependencies: 175
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: martin
--

INSERT INTO properties (id, created_at, updated_at, neighborhood, address, description, price_currency, contact_telephone, contact_from_time, contact_to_time, contact_email, tiger_id, bedroom_amount, bathroom_amount, floor, floor_amount, contact_from_day, contact_to_day, lat, lon, price, m2_built, m2_not_built, price_includes_shared_expenses, has_garage, shared_expenses, contact_info_view_count, for_sale, for_rent, property_type) VALUES (8, '2016-04-09 13:10:27.146219', '2016-04-09 13:10:27.182349', 'Pocitos', 'Chucarro 1035 apartamento 101, esquina Marti.', '- Apartamento de un dormitorio con importante y cómodo placard.
                          - Living comedor y terraza cerrada.
                          - Cocina con mesada y placard aéreo.
                          - Dos pisos por escalera.
                          - A dos cuadras de la rambla.', 'UYU', '099977882', '09:00', '18:00', 'mrifonelizalde@gmail.com', 5, 3, 3, 1, 1, 0, 4, -34.912717, -56.149395, 15000.0, 50.0, 10.0, false, true, 2000.0, 0, false, true, 'apartment');
INSERT INTO properties (id, created_at, updated_at, neighborhood, address, description, price_currency, contact_telephone, contact_from_time, contact_to_time, contact_email, tiger_id, bedroom_amount, bathroom_amount, floor, floor_amount, contact_from_day, contact_to_day, lat, lon, price, m2_built, m2_not_built, price_includes_shared_expenses, has_garage, shared_expenses, contact_info_view_count, for_sale, for_rent, property_type) VALUES (9, '2016-04-09 13:10:27.307072', '2016-04-09 13:10:27.311142', 'Pocitos', 'Achiras 123 apartamento 202, esquina Pereira.', 'Penthouse proximo a 26 de marzo y Pagola, , $1.350 GASTOS COMUNES sobre calle tranquila de poca circulación, muy luminoso con todos los ambientes con luz solar, recientemente remodelado cuenta con calefón y bomba de presión de agua, impecable. tiene puerta blindada y doble ventanas y pisos de parquet. El baño está hecho a nuevo con cañería. En la cocina hay conexión para lavavajillas y lavarropas
                          NO TIENE COCHERA. / CONTRATO POR 2 AÑOS
                          Ocupación a partir del 2 de mayo ya que actualmente esta alquilado', 'UYU', '097981601', '08:00', '22:00', 'ivane2004@gmail.com', 57, 1, 1, 2, 1, 0, 6, -34.909176, -56.193398, 17900.0, 40.0, 0.0, false, false, 1350.0, 0, false, true, 'apartment');
INSERT INTO properties (id, created_at, updated_at, neighborhood, address, description, price_currency, contact_telephone, contact_from_time, contact_to_time, contact_email, tiger_id, bedroom_amount, bathroom_amount, floor, floor_amount, contact_from_day, contact_to_day, lat, lon, price, m2_built, m2_not_built, price_includes_shared_expenses, has_garage, shared_expenses, contact_info_view_count, for_sale, for_rent, property_type) VALUES (11, '2016-04-09 13:10:27.362806', '2016-04-09 13:10:27.366296', 'Centro', 'Yaguaron 4321, esquina Mercedes.', 'DUEÑO VENDE o ALQUILA.
 
                          ALQUILER:
                          SIN MUEBLES $ 19900. (quedan 3 aires nuevos y calefon a gas)
                          AMUEBLADO COMPLETO $ 24900. (se puede combersar) 
                          GARANTIA ANDA o CONTADURIA 
                          Deposito 6 meses y libre de Clearing de informes.
                           
                          VENTA:
                          PRECIO U$S 80000 + BHU (saldo 2000 UR) cuota actual $ 16000. mensual . TOTAL u$s 139000.
                           
                          ENTREGA INMEDIATA
                           VISITAS COORDINAR YA QUE ME ENCUENTO EN COLONIA , SABADOS O DOMINGO 
                          Cel. ***', 'UYU', '097981601', '08:00', '22:00', 'ivane2004@gmail.com', 59, 1, 1, 2, 1, 0, 6, -34.909176, -56.193398, 17900.0, 40.0, 0.0, false, false, 0.0, 0, true, true, 'house');
INSERT INTO properties (id, created_at, updated_at, neighborhood, address, description, price_currency, contact_telephone, contact_from_time, contact_to_time, contact_email, tiger_id, bedroom_amount, bathroom_amount, floor, floor_amount, contact_from_day, contact_to_day, lat, lon, price, m2_built, m2_not_built, price_includes_shared_expenses, has_garage, shared_expenses, contact_info_view_count, for_sale, for_rent, property_type) VALUES (12, '2016-04-09 13:10:27.393902', '2016-04-09 13:10:27.398583', 'Centro', 'San Jose 1133 apartamento 901, esquina Paraguay.', 'Impecable y amplio apto. a metros de Pza. Libertad.
                          Para oficina o vivienda. Living y comedor con balcón al frente, escritorio, 3 dorm, 2 baños, svo. completo y cocina. Calef. central.
                          De categoría, pisos madera. Gtos. com. $ 4.000 verano y $ 8.000 invierno.
                          Welcome Servicios Inmobiliarios.  *** - welcome@*** o consulte a nuestra pagina ***', 'UYU', '097981601', '08:00', '22:00', 'ivane2004@gmail.com', 60, 1, 1, 2, 1, 0, 6, -34.909176, -56.193398, 30000.0, 40.0, 0.0, true, false, 1000.0, 0, false, true, 'apartment');
INSERT INTO properties (id, created_at, updated_at, neighborhood, address, description, price_currency, contact_telephone, contact_from_time, contact_to_time, contact_email, tiger_id, bedroom_amount, bathroom_amount, floor, floor_amount, contact_from_day, contact_to_day, lat, lon, price, m2_built, m2_not_built, price_includes_shared_expenses, has_garage, shared_expenses, contact_info_view_count, for_sale, for_rent, property_type) VALUES (13, '2016-04-09 13:10:27.422254', '2016-04-09 13:10:27.425544', 'Centro', 'Canelones 5463 apartamento 201, esquina Ciudadela.', 'Excelente ubicación a una cuadra de Rambla Sur y a dos de Plaza Independencia.
                          Consta de living comedor y dormitorio con pisos de parquet. Cocina definida con placard y baño con duchero, calefón y mampara.
                          Muy buena construcción y muy luminoso ubicado en segundo piso.', 'UYU', '097981601', '08:00', '22:00', 'ivane2004@gmail.com', 61, 1, 1, 2, 1, 0, 6, -34.909176, -56.193398, 16500.0, 40.0, 0.0, false, false, 2000.0, 0, false, true, 'apartment');
INSERT INTO properties (id, created_at, updated_at, neighborhood, address, description, price_currency, contact_telephone, contact_from_time, contact_to_time, contact_email, tiger_id, bedroom_amount, bathroom_amount, floor, floor_amount, contact_from_day, contact_to_day, lat, lon, price, m2_built, m2_not_built, price_includes_shared_expenses, has_garage, shared_expenses, contact_info_view_count, for_sale, for_rent, property_type) VALUES (10, '2016-04-09 13:10:27.337783', '2016-04-09 13:16:25.891182', 'Centro', 'Rio Negro 1187 apartamento 202, esquina Canelones.', 'Very nice apartment.', 'UYU', '097981601', '08:00', '22:00', 'ivane2004@gmail.com', 58, 1, 1, 2, 1, 0, 6, -34.909176, -56.193398, 10000.0, 40.0, 0.0, false, false, 0.0, 0, true, false, 'apartment');


--
-- TOC entry 2069 (class 0 OID 0)
-- Dependencies: 174
-- Name: properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: martin
--

SELECT pg_catalog.setval('properties_id_seq', 13, true);


--
-- TOC entry 2053 (class 0 OID 24923)
-- Dependencies: 173
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: martin
--

INSERT INTO schema_migrations (version) VALUES ('20160113013702');
INSERT INTO schema_migrations (version) VALUES ('20160123205436');
INSERT INTO schema_migrations (version) VALUES ('20160123211328');
INSERT INTO schema_migrations (version) VALUES ('20160124204800');
INSERT INTO schema_migrations (version) VALUES ('20160125214258');
INSERT INTO schema_migrations (version) VALUES ('20160125215503');
INSERT INTO schema_migrations (version) VALUES ('20160128012740');
INSERT INTO schema_migrations (version) VALUES ('20160209231147');
INSERT INTO schema_migrations (version) VALUES ('20160209231435');
INSERT INTO schema_migrations (version) VALUES ('20160210011409');
INSERT INTO schema_migrations (version) VALUES ('20160409125159');
INSERT INTO schema_migrations (version) VALUES ('20160409131349');


--
-- TOC entry 1942 (class 2606 OID 24951)
-- Name: images_pkey; Type: CONSTRAINT; Schema: public; Owner: martin; Tablespace: 
--

ALTER TABLE ONLY images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- TOC entry 1940 (class 2606 OID 24940)
-- Name: properties_pkey; Type: CONSTRAINT; Schema: public; Owner: martin; Tablespace: 
--

ALTER TABLE ONLY properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (id);


--
-- TOC entry 1943 (class 1259 OID 24952)
-- Name: index_images_on_property_id; Type: INDEX; Schema: public; Owner: martin; Tablespace: 
--

CREATE INDEX index_images_on_property_id ON images USING btree (property_id);


--
-- TOC entry 1938 (class 1259 OID 24929)
-- Name: unique_schema_migrations; Type: INDEX; Schema: public; Owner: martin; Tablespace: 
--

CREATE UNIQUE INDEX unique_schema_migrations ON schema_migrations USING btree (version);


--
-- TOC entry 2064 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2016-04-14 09:26:12 UYT

--
-- PostgreSQL database dump complete
--

