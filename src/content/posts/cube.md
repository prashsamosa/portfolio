---
title: Cube
author: Prashant Bhardwaj
description: a minimalistic orchestrator designed to efficiently manage and deploy microservices
pubDate: 2024-06-24
tags:
  - Go
  - Chi
  - Docker SDK
  - BoltDB
  - Linux
---


# Cube - Minimalistic Orchestrator

Cube is a minimalistic orchestrator designed to efficiently manage and deploy microservices. Built with **Go (Golang)** and integrated with **Docker SDK**, Cube offers a robust and scalable solution for container orchestration.

## Features

- **Modular Microservices Architecture**: Components include Task, Worker, Manager, and Scheduler.
- **Container Management**: Seamless integration with **Docker SDK** for container operations.
- **Persistent Storage**: Efficient data storage with **BoltDB**.
- **Real-Time Metrics**: Monitoring and metrics collection using **goprocinfo**.
- **Scalability**: Designed to handle high load conditions and improve deployment speed.

## Architecture

Cube is designed with a modular approach, consisting of the following core components:

1. **Task**: Defines the basic unit of work to be executed.
2. **Worker**: Manages and executes tasks using Docker containers.
3. **Manager**: Oversees workers and distributes tasks.
4. **Scheduler**: Determines the order and timing of task execution.

![Cube Architecture](/cube-light.png)


