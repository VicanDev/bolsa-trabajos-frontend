<div align="center">

# 💼 ChambaYa - Portal de Trabajos Temporales
### *La plataforma definitiva para conectar talentos con oportunidades de manera rápida y segura.*

<p align="center">
  <img src="https://img.shields.io/badge/Status-En%20Desarrollo-success?style=for-the-badge&logo=git" alt="Status" />
  <img src="https://img.shields.io/badge/Angular-18%2B-red?style=for-the-badge&logo=angular" alt="Angular" />
  <img src="https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?style=for-the-badge&logo=springboot" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/MySQL-Database-blue?style=for-the-badge&logo=mysql" alt="MySQL" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License" />
</p>

</div>

---

## 📌 Tabla de Contenidos
*   [✨ Acerca del Proyecto](#-acerca-del-proyecto)
*   [🚀 Características Principales](#-características-principales)
*   [🛠️ Tecnologías Utilizadas](#-tecnologías-utilizadas)
*   [📂 Arquitectura del Sistema](#-arquitectura-del-sistema)
*   [⚙️ Guía de Instalación y Configuración](#️-guía-de-instalación-y-configuración)
*   [🔗 Endpoints de la API](#-endpoints-de-la-api)
*   [👥 Equipo de Desarrollo](#-equipo-de-desarrollo)

---

## ✨ Acerca del Proyecto

**ChambaYa** es una aplicación Web Full Stack diseñada para optimizar la búsqueda y gestión de empleos temporales. El sistema cuenta com un entorno robusto de seguridad, persistencia avanzada de datos con encriptación de credenciales y un frontend moderno, dinámico y responsivo construido bajo los más altos estándares de desarrollo web moderno.

---

## 🚀 Características Principales

*   🔐 **Autenticación y Seguridad:** Integración con *Spring Security* y encriptación de contraseñas mediante *BCrypt*.
*   👥 **Registro y Gestión de Usuarios:** Creación de cuentas dinámicas con control de roles (*Postulantes* / *Administradores*).
*   🌐 **Control de CORS:** Configuración avanzada de políticas de intercambio de recursos entre puertos (*Angular 4200* y *Spring Boot 8081*).
*   📊 **Dashboard Interactivo:** Visualización dinámica de ofertas de trabajo temporales disponibles.
*   📄 **Detalle de Ofertas y Postulación:** Módulo especializado para consultar los requisitos de cada empleo y postular con un solo clic.

---

## 🛠️ Tecnologías Utilizadas

### **Frontend:**
*   **Angular** (Framework SPA moderno basado en TypeScript).
*   **Bootstrap 5** (Diseño de componentes UI responsivos y modernos).
*   **RxJS & Angular Router** (Manejo de flujos asíncronos y navegación de rutas).

### **Backend & Base de Datos:**
*   **Java & Spring Boot** (Arquitectura REST API robusta).
*   **Spring Data JPA & Hibernate** (Mapeo objeto-relacional y gestión automática de esquemas).
*   **Spring Security** (Protección de endpoints y filtros de seguridad).
*   **MySQL & MySQL Workbench** (Gestor de base de datos relacional).

---

## 📂 Arquitectura del Sistema

```text
chamba-ya/
│
├── bolsa-trabajos-frontend/      # Repositorio Frontend (Angular SPA)
│   ├── src/app/
│   │   ├── login/                # Componente de Autenticación
│   │   ├── registro/             # Componente de Registro de Usuarios
│   │   ├── dashboard-postulante/ # Vista principal de Ofertas
│   │   └── detalle-oferta/       # Vista de detalles y postulación
│
└── bolsa-trabajos-backend/       # Repositorio Backend (Spring Boot REST API)
    ├── src/main/java/com/bolsa/trabajos/
    │   ├── controller/           # Controladores REST (Auth, Usuarios)
    │   ├── model/                # Entidades JPA (Usuario)
    │   ├── repository/           # Interfaces de persistencia de datos
    │   ├── service/              # Lógica de negocio
    │   └── security/             # Configuración de Spring Security & CORS
