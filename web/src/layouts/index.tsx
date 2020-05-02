import React, { ReactChildren } from "react";
import Helmet from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "src/components/header";
import { Footer } from "src/components/footer";
import { SwitchTransition, Transition } from "react-transition-group";
import { CartDrawer } from "src/components/cartDrawer";
import "src/styles/main.css";

const duration = 0.8;

const variants = {
  initial: {
    y: "100vh"
  },
  enter: {
    y: "0vh",
    transition: {
      duration,
      // delay: duration,
      when: "beforeChildren"
    }
  },
  exit: {
    y: "-100vh",
    transition: { duration }
  }
};

const TRANSITION_DURATION = 800;
const TRANSITION_STYLES = {
  default: {
    transition: `transform ${TRANSITION_DURATION}ms ease-in-out`,
    transform: "translateY(0vh)"
  },
  entering: {
    transform: "translateY(100vh)"
  },
  entered: {
    transform: "translateY(0vh)"
  },
  exiting: {
    transform: "translateY(-100vh)"
  },
  exited: {
    transform: "translateY(-100vh)"
  }
};

const Layout = ({
  children,
  location
}: {
  children: ReactChildren;
  location: any;
}) => {
  return (
    <React.Fragment>
      <Helmet title="Midway">
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div>
        <Header />
        <CartDrawer />
        {!/account/.test(location.pathname) ? (
          <AnimatePresence>
            <motion.main
              key={location.pathname}
              style={{
                position: "absolute",
                width: "100%",
                minHeight: "100vh"
              }}
              variants={variants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              {children}
              <Footer />
            </motion.main>
          </AnimatePresence>
        ) : (
          // <SwitchTransition>
          //   <Transition
          //     key={location.pathname}
          //     // enter={true}
          //     // exit={true}
          //     // appear={true}
          //     mountOnEnter={false}
          //     unmountOnExit={false}
          //     timeout={{
          //       enter: TRANSITION_DURATION,
          //       exit: TRANSITION_DURATION / 2
          //     }}
          //   >
          //     {status => (
          //       <div
          //         style={{
          //           position: "absolute",
          //           width: "100%",
          //           borderBottom: "2px solid red",
          //           ...TRANSITION_STYLES.default,
          //           ...TRANSITION_STYLES[status]
          //         }}
          //       >
          //         {children}
          //         <Footer />
          //       </div>
          //     )}
          //   </Transition>
          // </SwitchTransition>
          <div>
            {children}
            <Footer />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Layout;
