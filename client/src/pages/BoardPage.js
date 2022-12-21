import { AnimatePresence } from "framer-motion";
import { Suspense, useContext, useEffect, useReducer, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useNavigate, useParams } from "react-router-dom";
import boardApi from "../api/boardApi";
import cardApi from "../api/cardApi";
import listApi from "../api/listApi";
import BoardCanvas from "../components/Board/BoardCanvas";
import BoardNav from "../components/Board/BoardNav";
import CardDetailsBox from "../components/CardDetailsBox/CardDetailsBox";
import Loader from "../components/Loader";
import { AuthContext } from "../config/Auth";
import ACTIONS from "../reducers/actions";
import cardReducer from "../reducers/cardReducer";
import listReducer from "../reducers/listReducer";
import cardReorderer from "../utils/cardReorderer";
import listReorderer from "../utils/listReorderer";

const BoardPage = () => {
  const [boardData, setBoardData] = useState(null);
  const [lists, dispatchLists] = useReducer(listReducer, []);
  const [cards, dispatchCards] = useReducer(cardReducer, []);
  const [cardBox, setCardBox] = useState({ cardData: null, isOpen: false });

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await boardApi.get(id);

        if (!data) {
          navigate("/notfound");
          return;
        }

        dispatchLists({
          type: ACTIONS.SET_LISTS,
          payload: data.lists,
        });

        dispatchCards({
          type: ACTIONS.SET_CARDS,
          payload: data.cards,
        });

        setBoardData({ title: data.boardTitle, id: data._id });
        navigate(`/b/${id}/${data.boardTitle}`);
      } catch (error) {
        console.log(error);
        navigate("/notfound");
      }
    })();

    return () => {
      setBoardData(null);

      dispatchLists({
        type: ACTIONS.SET_LISTS,
        payload: [],
      });

      dispatchCards({
        type: ACTIONS.SET_CARDS,
        payload: [],
      });
    };
  }, [id, navigate]);

  const toggleCardBox = (cardId, isOpen) => setCardBox({ cardId, isOpen });

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;

    const { destination, type, draggableId, source } = result;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "CARD") {
      const { allCards, updatedCard } = cardReorderer(
        cards,
        destination,
        source,
        draggableId
      );

      dispatchCards({
        type: ACTIONS.REORDER_CARD,
        payload: allCards,
      });

      try {
        await cardApi.update(updatedCard);
      } catch (error) {
        console.log(error);
      }
      return;
    }

    const { updatedLists, updatedList } = listReorderer(
      lists,
      destination,
      source
    );

    dispatchLists({
      type: ACTIONS.REORDER_LIST,
      payload: updatedLists,
    });

    try {
      await listApi.update(updatedList);
    } catch (error) {
      console.log(error);
    }
  };

  if (!boardData) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <div className="h-screen flex flex-col">
        <AnimatePresence>
          {cardBox.isOpen && (
            <CardDetailsBox
              cards={cards}
              lists={lists}
              toggleCardBox={toggleCardBox}
              cardBox={cardBox}
              dispatchCards={dispatchCards}
            />
          )}
        </AnimatePresence>
        <div className="bg-boardPage absolute w-full h-screen -z-10"></div>
        <BoardNav
          user={user}
          boardData={boardData}
          setBoardData={setBoardData}
        />
        <main className="flex h-full overflow-x-auto">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <BoardCanvas
              boardId={boardData.id}
              lists={lists}
              cards={cards}
              dispatchLists={dispatchLists}
              dispatchCards={dispatchCards}
              toggleCardBox={toggleCardBox}
            />
          </DragDropContext>
        </main>
      </div>
    </Suspense>
  );
};

export default BoardPage;
