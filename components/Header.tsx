'use client';

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Search from './Search';
import CatalogButton from './catalog-button';

import FacebookIcon from './icons/FacebookIcon';
import InstagramIcon from './icons/InstagramIcon';
import YouTubeIcon from './icons/YouTubeIcon';
import ContactIcon from './icons/ContactIcon';
import AccountIcon from './icons/AccountIcon';
import CartIcon from './icons/CartIcon';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#378410' }} className="text-white py-3">
      <Container fluid>
        <Row className="mt-2">
          {/* Логотип */}
          <Col
            xs={12}
            md={2}
            className="d-flex align-items-center justify-content-center justify-content-md-start mb-3 mb-md-0"
          >
            <a href="/">
              <img
                src="/icons/logo.svg"
                alt="ProfStore"
                style={{ maxHeight: '100px', objectFit: 'contain' }}
              />
            </a>
          </Col>

          {/* Права частина */}
          <Col xs={12} md={10}>
            {/* Верхній рядок: соцмережі + іконки */}
            <Row className="text-center mb-2">
              <Col
                xs={12}
                md={3}
                className="d-flex justify-content-center align-items-center mb-3 mb-md-0"
              >
                <div className="d-flex gap-3 justify-content-center align-items-center w-100">
                  <FacebookIcon />
                  <InstagramIcon />
                  <YouTubeIcon />
                </div>
              </Col>
              <Col md={5} className="d-none d-md-block" />
              <Col
                xs={12}
                md={4}
                className="d-flex justify-content-around align-items-center"
              >
                <ContactIcon />
                <AccountIcon />
                <CartIcon />
              </Col>
            </Row>

            {/* Нижній рядок: Каталог і Пошук */}
            <Row>
              <Col
  xs={12}
  md={3}
  style={{ position: 'relative', zIndex: 10, overflow: 'visible' }}
>
  <CatalogButton />
</Col>

              <Col xs={12} md={9}>
                <Search />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;