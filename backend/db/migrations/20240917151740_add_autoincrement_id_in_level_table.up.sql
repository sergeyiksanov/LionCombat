CREATE SEQUENCE levels_id_seq
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0 
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "levels" ALTER COLUMN "id" SET DEFAULT nextval('levels_id_seq');