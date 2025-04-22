import Logo from './Logo';

const LoadingScreen = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center">
        <Logo className="h-16 w-16 animate-pulse" />
        <h2 className="mt-4 text-2xl font-semibold animate-pulse">Loading...</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;