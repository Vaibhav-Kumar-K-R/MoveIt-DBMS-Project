import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useGetStatsRequest } from "@/api/AdminsApi";
import Redirect from "@/pages/redirect/Redirect";
import { cardData } from "@/constants/index";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const [cards, setCards] = useState<typeof cardData>([]);
  let { isLoading, isError, response } = useGetStatsRequest();
  const { toast } = useToast();
  useEffect(() => {
    if (response) {
      Object.entries(response).map(([_, value]: [any, any], index) => {
        cardData[index].value = parseInt(value);
      });
      setCards(cardData);
    }
  }, [response]);

  if (isError) {
    toast({
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
    });
  }

  if (isLoading) {
    return <Redirect />;
  }
  return (
    <div className="space-y-4 px-4">
      <h1 className="text-3xl  font-bold">Dashboard</h1>
      <div className="grid gap-4 p-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex  flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium">
                {card.title}
              </CardTitle>
              <card.icon
                className={`h-6 w-6 ${card.color}   text-muted-foreground`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
