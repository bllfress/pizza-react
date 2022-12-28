import { store } from "@/store";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
// import {Inter} from '@next/font/google'
import "src/styles/app.scss";
import "src/styles/globals.scss";

// const inter = Inter({
//   weight: ["400", "500", "600", "700", "800", "900"],
//   subsets: ["latin", "cyrillic", "cyrillic-ext"],
// })

import { trpc } from "@/utils/trpc";
import { Provider } from "react-redux";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      {/*<style jsx global>{`*/}
      {/*  html {*/}
      {/*    font-family: ${inter.style.fontFamily};*/}
      {/*  }*/}
      {/*`}</style>*/}
      <SessionProvider session={session}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
