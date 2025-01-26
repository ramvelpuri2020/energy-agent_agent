# EnergySwap 

EnergySwap is a decentralized application (dApp) that optimizes energy usage and facilitates peer-to-peer energy trading. It leverages AI and blockchain technology to empower users to monitor, predict, and optimize their energy consumption while enabling them to trade excess energy using Solana wallets.

## Features

- **AI Energy Management**: 
  - **Monitoring & Prediction**: Insights and future usage predictions based on historical data.
  - **Optimization**: Personalized recommendations to enhance energy efficiency and reduce costs.

- **Decentralized Marketplace**:
  - **Trade Energy**: List and purchase excess energy with dynamic pricing.
  - **Localized Trading**: Search and filter offers by location for efficient energy exchange.

- **Secure Solana Transactions**:
  - **Wallet Integration**: Fast, secure transactions using Solana wallets.
  - **Blockchain Security**: Transparent and immutable transaction records.

## Backend with FastAPI

- **RESTful API**: High-performance API for data management and business logic.
- **Python-Powered**: Implements AI algorithms and backend operations.

## Getting Started

### Prerequisites

- **Node.js**: Required for the frontend.
- **Python**: Version 3.7 or higher for the backend.
- **Solana Wallet**: Install a wallet extension like Phantom.

### Installation

#### Frontend

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Gaurav-612/energy-agent_agent.git
   cd energy-agent_agent/
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Frontend**:
   ```bash
   npm start
   ```

#### Backend

1. **Navigate to Backend Directory**:
   ```bash
   cd .backend
   ```

2. **Create a Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Python Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the Backend**:
   ```bash
   uvicorn main:app --reload
   ```

### Usage

- **Connect Wallet**: Link your Solana wallet.
- **Explore Marketplace**: Browse or create energy listings.
- **Execute Trades**: Buy or sell energy using your wallet.

## Contributing

Contributions are welcome. Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
