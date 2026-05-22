import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './src/components/Layout';
import Landing from './src/pages/Landing';
import Tasks from './src/pages/Tasks';
import TicTacToe from './src/pages/TicTacToe';
import "./styles.css";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
        </Routes>
      </Layout>
    </Router>
  );
}
