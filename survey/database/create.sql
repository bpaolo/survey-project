CREATE DATABASE survey;


CREATE TABLE "question" (
    "id_question" SERIAL,
    "title" text NOT NULL,
    date timestamp default now(),
    CONSTRAINT "PK_Question" PRIMARY KEY ("id_question")
);


CREATE TABLE "option" (
    "id_option" SERIAL,
    "option" VARCHAR(50) NOT NULL,
    "id_question" INT NOT NULL,
    CONSTRAINT "PK_Option" PRIMARY KEY ("id_option"),
    CONSTRAINT "FK_Option_Question" FOREIGN KEY ("id_question") REFERENCES "question" ("id_question")
);

CREATE TABLE "result" (
    "id_result" SERIAL,
    "id_question" INT NOT NULL,
    "id_option" INT NOT NULL,
    "vote" INT DEFAULT 1 NOT NULL,
    CONSTRAINT "PK_Result" PRIMARY KEY ("id_result"),
    CONSTRAINT "FK_Result_Question" FOREIGN KEY ("id_question") REFERENCES "question" ("id_question"),
    CONSTRAINT "FK_Result_Option" FOREIGN KEY ("id_option") REFERENCES "option" ("id_option")
);
