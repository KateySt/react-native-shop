import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { PressableComponent } from '@/components/PressableComponent';
import SingleCard from '@/components/SingleCard';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { getProductsAsync, selectProducts } from '@/features/product/productSlice';
import { useAdaptation } from '@/hooks/useAdaptation';
import { Product } from '@/interface/Product';
import { BORDERRADIUS, COLORS, SPACING } from '@/theme/theme';

const HomeScreen: React.FC = () => {
  const [cards, setCards] = useState<{ src: string; matched: boolean; id: number }[]>([]);
  const [turns, setTurns] = useState<number>(0);
  const [choiceOne, setChoiceOne] = useState<{ src: string; matched: boolean; id: number } | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<{ src: string; matched: boolean; id: number } | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isButtonScaled, setIsButtonScaled] = useState<boolean>(false);
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const { icon, background } = useAdaptation();

  useEffect(() => {
    dispatch(getProductsAsync());
  }, []);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const cardImg = products.slice(0, 12).map((el: Product) => ({ src: el.image, matched: false }));
    const shuffledCards = [...cardImg, ...cardImg]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card: { src: string; matched: boolean; id: number }) => {
    if (!disabled && card !== choiceOne && card !== choiceTwo) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  const handleButtonPress = () => {
    setIsButtonScaled(true);
    shuffleCards();
    setTimeout(() => {
      setIsButtonScaled(false);
    }, 300);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.scopeContainer}>
        <Pressable
          style={[styles.button, isButtonScaled ? styles.scaledButton : null]}
          onPress={handleButtonPress}
          disabled={disabled}>
          <Text style={{ color: background }}>New Game</Text>
        </Pressable>
        <Text style={[{ color: icon }]}>Turns: {turns}</Text>
      </View>
      <View style={styles.cardGrid}>
        {cards.map((card, id) => (
          <SingleCard
            key={id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SPACING.space_16,
  },
  scopeContainer: { justifyContent: 'center', alignItems: 'center' },
  button: {
    width: 200,
    alignItems: 'center',
    padding: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_4,
    backgroundColor: COLORS.primaryVioletHex,
    marginTop: SPACING.space_16,
  },
  cardGrid: {
    marginTop: SPACING.space_16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scaledButton: {
    transform: [{ scale: 1.1 }],
  },
});

export default HomeScreen;
