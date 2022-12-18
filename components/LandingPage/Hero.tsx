import { AuthModal } from '@/components/AuthModal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../app/hooks';
import { openModal } from '@/store/slices/sliceModal';
import { GiClick } from 'react-icons/gi';
import { MdDashboardCustomize } from 'react-icons/md';
import Lottie from 'lottie-react';
import animation from './lotties/hero.json';
import { Button } from '@/components/Button';
import { motion } from 'framer-motion';

export const Hero = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const handleModal = () => dispatch(openModal());
  const handleRoute = () => router.push('/projects');

  const style = {
    height: 435,
    width: 435,
  };

  return (
    <header className="m-auto my-20 px-4 lg:flex lg:items-center lg:justify-between">
      <AuthModal title={'Continue with your social accounts'} />
      <div className="flex flex-col items-center gap-10 text-center lg:items-start lg:text-left">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          layout
          className="text-4xl font-bold"
        >
          Start Contributing to{' '}
          <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent dark:from-orange-500 dark:via-orange-700 dark:to-orange-500">
            Open Source
          </span>{' '}
          Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          layout
          className="max-w-[50rem] font-light  dark:text-gray-300 md:text-xl"
        >
          ProjectMate helps you to find awesome open source projects based on
          the skills you have. You can also find new contributors for your open
          source project by sharing it on ProjectMate !
        </motion.p>
        <div className="flex w-full flex-col items-center justify-between gap-4 md:w-auto md:flex-row">
          {session === null && (
            <Button
              onClick={handleModal}
              isDisabled={false}
              className="text-md w-full py-3 px-6 font-semibold md:w-auto md:text-lg"
            >
              <span className="flex items-center justify-center gap-3">
                Login / Register
                <GiClick className="text-2xl" />
              </span>
            </Button>
          )}
          {session !== undefined && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              layout
              onClick={handleRoute}
              className={`text-md w-full rounded-md bg-slate-100 py-3 px-6 font-semibold text-gray-600 hover:opacity-75 focus:ring dark:bg-slate-800 dark:text-gray-200 md:w-auto md:text-lg ${
                session &&
                '!bg-orange-100 !text-orange-500 ring-orange-800 dark:!bg-[#2c1c0f] dark:!text-orange-400'
              }`}
            >
              <span className="flex items-center justify-center gap-3">
                Explore Projects
                <MdDashboardCustomize />
              </span>
            </motion.button>
          )}
        </div>
      </div>
      <div className="-mr-10 hidden lg:block">
        <Lottie animationData={animation} style={style} />
      </div>
    </header>
  );
};