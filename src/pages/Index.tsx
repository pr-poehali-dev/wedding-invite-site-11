import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [rsvp, setRsvp] = useState({
    name: '',
    attending: '',
    guests: 1,
    dietary: [] as string[],
    menu: '',
    message: ''
  });

  // Wedding date - set to a future date
  const weddingDate = new Date('2025-09-15T15:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const handleDietaryChange = (dietary: string, checked: boolean) => {
    setRsvp(prev => ({
      ...prev,
      dietary: checked 
        ? [...prev.dietary, dietary]
        : prev.dietary.filter(d => d !== dietary)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="mb-8">
            <Icon name="Heart" className="mx-auto text-primary animate-pulse-heart" size={48} />
          </div>
          
          <h1 className="font-playfair text-6xl md:text-8xl font-bold text-primary mb-4">
            Анна & Дмитрий
          </h1>
          
          <p className="font-playfair italic text-2xl md:text-3xl text-secondary mb-8">
            Приглашаем вас разделить с нами этот особенный день
          </p>
          
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-6 py-3 rounded-full shadow-lg">
            <Icon name="Calendar" size={20} className="text-primary" />
            <span className="font-medium text-lg">15 сентября 2025</span>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl font-bold text-foreground mb-8">
            До свадьбы осталось
          </h2>
          
          <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
            {[
              { label: 'Дней', value: timeLeft.days },
              { label: 'Часов', value: timeLeft.hours },
              { label: 'Минут', value: timeLeft.minutes },
              { label: 'Секунд', value: timeLeft.seconds }
            ].map((item, index) => (
              <Card key={index} className="border-2 border-primary/20 bg-white/50 backdrop-blur">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary font-playfair mb-2">
                    {item.value}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">
                    {item.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-center text-foreground mb-12">
            Программа дня
          </h2>
          
          <div className="space-y-8">
            {[
              { time: '15:00', title: 'Церемония', description: 'Официальная регистрация брака', icon: 'Heart' },
              { time: '16:00', title: 'Фотосессия', description: 'Свадебные фотографии в парке', icon: 'Camera' },
              { time: '18:00', title: 'Банкет', description: 'Праздничный ужин и танцы', icon: 'Utensils' },
              { time: '21:00', title: 'Развлечения', description: 'Музыка, игры и веселье', icon: 'Music' },
              { time: '00:00', title: 'Завершение', description: 'Проводы молодых', icon: 'Star' }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-6 p-6 bg-white/60 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name={item.icon as any} size={24} className="text-primary" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-2xl font-bold text-primary">{item.time}</span>
                    <h3 className="font-playfair text-xl font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-center text-foreground mb-12">
            Место проведения
          </h2>
          
          <Card className="bg-white/60 backdrop-blur border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
                    Ресторан "Белый сад"
                  </h3>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <Icon name="MapPin" size={20} className="text-primary" />
                      <span>ул. Пушкинская, 15, Москва</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" size={20} className="text-primary" />
                      <span>+7 (495) 123-45-67</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Car" size={20} className="text-primary" />
                      <span>Бесплатная парковка</span>
                    </div>
                  </div>
                  <Button className="mt-6 bg-primary hover:bg-primary/90">
                    <Icon name="Navigation" size={18} className="mr-2" />
                    Маршрут
                  </Button>
                </div>
                
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl p-8 text-center">
                  <Icon name="Building" size={64} className="mx-auto text-primary/60 mb-4" />
                  <p className="text-muted-foreground">
                    Элегантный ресторан в центре города с прекрасным видом на парк
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* RSVP Form */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-center text-foreground mb-12">
            Подтверждение присутствия
          </h2>
          
          <Card className="bg-white/80 backdrop-blur border-2 border-primary/20">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-base font-medium">Ваше имя</Label>
                  <Input 
                    id="name" 
                    value={rsvp.name}
                    onChange={(e) => setRsvp(prev => ({...prev, name: e.target.value}))}
                    className="mt-2"
                    placeholder="Введите ваше имя"
                  />
                </div>
                
                <div>
                  <Label className="text-base font-medium mb-3 block">Будете ли вы присутствовать?</Label>
                  <RadioGroup 
                    value={rsvp.attending} 
                    onValueChange={(value) => setRsvp(prev => ({...prev, attending: value}))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">Да, обязательно приду!</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">К сожалению, не смогу</Label>
                    </div>
                  </RadioGroup>
                </div>

                {rsvp.attending === 'yes' && (
                  <>
                    <div>
                      <Label htmlFor="guests" className="text-base font-medium">Количество гостей</Label>
                      <Input 
                        id="guests" 
                        type="number" 
                        min="1" 
                        max="4"
                        value={rsvp.guests}
                        onChange={(e) => setRsvp(prev => ({...prev, guests: parseInt(e.target.value)}))}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-3 block">Особенности питания</Label>
                      <div className="space-y-2">
                        {['Вегетарианское', 'Веганское', 'Без глютена', 'Без лактозы'].map((dietary) => (
                          <div key={dietary} className="flex items-center space-x-2">
                            <Checkbox 
                              id={dietary}
                              checked={rsvp.dietary.includes(dietary)}
                              onCheckedChange={(checked) => handleDietaryChange(dietary, checked as boolean)}
                            />
                            <Label htmlFor={dietary}>{dietary}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-3 block">Предпочтения по меню</Label>
                      <RadioGroup 
                        value={rsvp.menu} 
                        onValueChange={(value) => setRsvp(prev => ({...prev, menu: value}))}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fish" id="fish" />
                          <Label htmlFor="fish">Рыбное блюдо</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="meat" id="meat" />
                          <Label htmlFor="meat">Мясное блюдо</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="vegetarian" id="vegetarian" />
                          <Label htmlFor="vegetarian">Вегетарианское блюдо</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="message" className="text-base font-medium">Пожелания молодым</Label>
                  <Textarea 
                    id="message" 
                    value={rsvp.message}
                    onChange={(e) => setRsvp(prev => ({...prev, message: e.target.value}))}
                    className="mt-2 h-24"
                    placeholder="Напишите ваши пожелания..."
                  />
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить ответ
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Gift Wishes */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl font-bold text-foreground mb-8">
            О подарках
          </h2>
          
          <Card className="bg-white/60 backdrop-blur border-2 border-primary/20">
            <CardContent className="p-8">
              <Icon name="Gift" size={48} className="mx-auto text-primary mb-6" />
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Ваше присутствие на нашей свадьбе — это самый дорогой подарок для нас! 
                Если вы всё же хотите порадовать нас, мы будем благодарны за любую помощь 
                в создании нашего семейного очага.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl">
                  <Icon name="Home" size={32} className="text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Для дома</h3>
                  <p className="text-muted-foreground">Предметы интерьера, посуда, текстиль</p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-xl">
                  <Icon name="Plane" size={32} className="text-secondary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Медовый месяц</h3>
                  <p className="text-muted-foreground">Поддержка нашего свадебного путешествия</p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-white/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <Icon name="CreditCard" size={16} className="inline mr-2" />
                  Реквизиты для переводов: Сбербанк 1234 5678 9012 3456
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-r from-primary/10 to-secondary/10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Icon name="Heart" className="mx-auto text-primary" size={32} />
          </div>
          
          <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">
            С любовью, Анна и Дмитрий
          </h3>
          
          <p className="text-muted-foreground mb-6">
            Мы с нетерпением ждём встречи с вами на нашей свадьбе!
          </p>
          
          <div className="flex justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="Phone" size={16} />
              <span>+7 (999) 123-45-67</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Mail" size={16} />
              <span>wedding@example.com</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;