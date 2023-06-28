import React, { useEffect, useState, useRef } from 'react';
import styles from './../styles/Book.module.css';
import {BsFillPlayBtnFill} from 'react-icons/bs';

const Estorias = () => {

  // Ref for the book container
  const bookContainerRef = useRef<HTMLDivElement | null>(null);
  // State for the flip page
  const [flipPage, setFlipPage] = useState(false);
  // State for the scroll position
  const [scrollPosition, setScrollPosition] = useState(0);
  // State for the flipping animation
  const [flipping, setFlipping] = useState(false);

  // Effect for the scroll event
  useEffect(() => {
    // Check if the book container ref exists
    if (bookContainerRef.current) {
      // Handle the scroll event
      const handleScroll = () => {
        // Get the container height, scroll threshold and the book container top
        const containerHeight = window.innerHeight;
        const scrollThreshold = containerHeight * 0.5;
        const bookContainerRect = bookContainerRef.current?.getBoundingClientRect();
        const bookContainerTop = bookContainerRect?.top || 0;
        const scrollY = window.scrollY || window.pageYOffset;

        // Set the scroll position
        setScrollPosition(scrollY);

        // Check if the page should flip
        const shouldFlipPage = scrollY >= scrollY + bookContainerTop + scrollThreshold;
        setFlipPage(shouldFlipPage);
         setFlipping(shouldFlipPage);
      };

      // Add the scroll event listener
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div>
      {/* Other sections */}
      <div className={styles.bookContainer} ref={bookContainerRef}>
        <div className={styles.bookSection}>
          {/* Content of the book section */}
        </div>
        <div className={`${styles.stickyDiv} ${scrollPosition >= 500 ? styles.sticky : ''}`}>
          <div className={styles.stickyContent}>
            <div className={`${styles.book} ${flipping ? styles.flipping : ''}`}>
              <div className={`${styles.back} ${flipPage ? styles.flipBack : ''}`}></div>
              <div className={`${styles.page6} ${flipPage ? styles.flipPage6 : ''}`}>
                <div className={styles.pageImage}>
                  <button className={styles.btnPlayRight}>
                    <BsFillPlayBtnFill className={styles.playRight} />
                  </button>
                </div>
              </div>
              <div className={`${styles.page5} ${flipPage ? styles.flipPage5 : ''}`}>
                <div className={styles.pageImage}>
                  <button className={styles.btnPlayLeft}>
                    <BsFillPlayBtnFill className={styles.playLeft}/>
                  </button>
                </div>
              </div>
              <div className={`${styles.page4} ${flipPage ? styles.flipPage4 : ''}`}></div>
              <div className={`${styles.page3} ${flipPage ? styles.flipPage3 : ''}`}></div>
              <div className={`${styles.page2} ${flipPage ? styles.flipPage2 : ''}`}></div>
              <div className={`${styles.page1} ${flipPage ? styles.flipPage1 : ''}`}></div>
              <div className={`${styles.front} ${flipPage ? styles.flipFront : ''}`}>
                Estorias
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Other sections */}
    </div>
  );
};

export default Estorias;
