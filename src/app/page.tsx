import { ErrorToast } from "@/components/ErrorDisplay";
import getAllMetadata from "@/tools/getAllMetadata";
import { userServerTranslation } from "@/hooks/useTranslation";
import { NextPage } from "next";
import T from "$/T";

const Home: NextPage = async () => {
  const { seasons, errors } = await getAllMetadata();
  const [t] = await userServerTranslation();

  return (
    <>
      <p>
        <T>{t.language.name}</T>
      </p>
      <p>
        Ex culpa est aliqua esse qui ipsum in aute quis consectetur excepteur. Minim anim excepteur pariatur laborum sit
        mollit. Eiusmod occaecat exercitation aute officia occaecat dolore excepteur nostrud culpa elit ut exercitation.
        Nisi id nisi laboris ex. Minim labore nisi ea dolore do consectetur elit ad aliquip in aliqua veniam. Dolore id
        cupidatat voluptate officia aliqua. Sit laborum voluptate commodo consectetur sint fugiat magna fugiat et Lorem
        elit. Et dolore magna ut cupidatat amet laborum incididunt aliquip culpa occaecat do. Quis occaecat deserunt ut
        deserunt minim irure eiusmod excepteur aliquip consectetur sit dolor velit ipsum. Anim amet proident officia
        laboris. Excepteur quis mollit tempor et est incididunt incididunt nisi dolor irure esse incididunt
        reprehenderit cupidatat. Nostrud proident irure incididunt in nostrud aliquip aliqua eu veniam occaecat et.
        Magna sunt consequat et proident pariatur mollit laboris qui minim velit. Veniam minim nostrud labore aliquip
        nulla veniam. Amet sunt ut cupidatat proident velit officia est consectetur eu reprehenderit nulla aliqua eu
        enim. Mollit cillum culpa ut est in aliquip nostrud adipisicing incididunt dolore. Cupidatat sunt proident sunt
        culpa esse in. Sunt aute tempor dolor est elit sunt mollit ad sit veniam. Amet deserunt aliquip sint culpa duis.
        Laborum est veniam laboris quis eu. Et ullamco ipsum eu reprehenderit ea dolor anim aliqua duis veniam ipsum.
        Commodo dolor sint officia do cupidatat in pariatur ipsum commodo sunt. Amet in in anim consequat. Ea consequat
        officia labore incididunt elit ad minim ullamco ipsum. Deserunt minim proident labore eu aliqua ipsum ex laboris
        sit anim exercitation. Dolore laborum excepteur voluptate ut. Quis ut et non nostrud nulla eiusmod dolor qui
        sint laboris voluptate proident. Deserunt quis dolor nisi pariatur occaecat labore cillum aliqua anim laboris.
        Laborum est culpa in pariatur dolore proident Lorem quis incididunt excepteur nostrud exercitation. Aliqua minim
        pariatur deserunt aliqua adipisicing deserunt adipisicing Lorem nostrud sunt commodo elit. Voluptate velit
        aliqua sunt ipsum est ipsum incididunt deserunt et in ea laboris est. Voluptate do ex et reprehenderit. Ipsum
        aliqua consectetur cupidatat ut nulla laborum dolore dolor consectetur culpa sunt consequat. Dolore minim ut
        quis Lorem ex aliqua quis ea laborum sint incididunt eiusmod laboris non. Sint eu mollit ex in quis. Do do esse
        ullamco aute ea consequat do irure. Excepteur voluptate dolore sit proident laborum aute cillum non nisi
        pariatur esse. Laboris aute ut quis laborum consequat in pariatur exercitation nisi adipisicing est ipsum Lorem.
        Culpa non enim amet laborum qui laborum cupidatat consequat sint eiusmod esse do incididunt nostrud.
        Reprehenderit qui veniam pariatur minim ex enim sit quis esse elit et officia reprehenderit. Exercitation
        exercitation non elit anim tempor deserunt velit. Laboris eiusmod adipisicing ad Lorem. Ea fugiat nulla do
        dolor. Aliquip culpa veniam commodo irure laboris elit qui anim commodo eiusmod nostrud est sint. Lorem ut nisi
        enim amet amet. Ullamco esse sunt ex non do nulla non. Fugiat Lorem eu proident eu ullamco commodo aute aliquip
        Lorem pariatur irure do. Id nisi ut mollit et tempor ipsum occaecat aute ea aliquip sint ipsum nisi.
        Exercitation quis cillum anim magna aliquip reprehenderit sit mollit. Minim labore dolore mollit adipisicing
        deserunt consequat qui labore. Exercitation amet do magna officia. Laboris in ut velit ut deserunt quis ut
        laboris duis in eu proident. Nulla labore reprehenderit velit est enim magna ad occaecat. Minim enim officia ea
        culpa sunt laborum aliquip qui labore sit.
      </p>
      <p>{JSON.stringify(seasons)}</p>
      <ErrorToast title={t.home.videoLoadError} errors={errors} />
    </>
  );
};

export default Home;
