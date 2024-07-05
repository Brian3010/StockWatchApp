import FlashMessage from '../../components/FlashMessage';
import Heading from '../../components/Heading';
import DisplayBohStock from './components/DisplayBohStock';
import DisplayFohStock from './components/DisplayFohStock';

export default function StockMenu() {
  return (
    <>
      <Heading to="../" headerName="Stock Lists" />

      <>
        <h1 className="pb-3 pt-20 text-xl font-semibold">Back of House</h1>
        <DisplayBohStock />
        <h1 className="pb-3 pt-10 text-xl font-semibold">Front of House</h1>
        <DisplayFohStock />
      </>

      <FlashMessage />
    </>
  );
}
