#ifndef Hash_H
#define Hash_H

#include <list>
//using namespace custom;
using namespace std;

/*****************************************************
* Hash
****************************************************/
template <class T>
class Hash 
{
    private:
        list<T> *table;
        int numElements;
        int numBuckets;
    public:
        Hash(int numBuckets)
        {
            numElements = 0;
            this->numBuckets = numBuckets;
            table = new list<T>[numBuckets];
        }

        Hash(const Hash &rhs)
        {                
            *this = rhs;
        }

        ~Hash()
        {
          table->clear();
        }

        Hash &operator = (const Hash &rhs) throw(const char*)
        {
            numBuckets = rhs.numBuckets;
            numElements = rhs.numElements;

            table = new list<T>[numBuckets];            
            
            for (int i = 0; i < numBuckets; i++)
            {
                table[i] = rhs.table[i];   
            }
            return *this;
        }

        bool empty()
        {
            return !numElements;
        }

        int size() const
        {
            return numElements;
        }

        int capacity()const
        {
            return numBuckets;
        }

        void clear()
        {
            numElements = 0;
            numBuckets = 0;
            for (int i = 0; i < numBuckets; i++)
            {
              table[i].clear();
            }
        }

        virtual int hash(const T & t) const = 0;

        bool find(const T & item)
        {
            int index = hash(item);
            for (typename list<T>::iterator it = table[index].begin(); it != table[index].end(); it++)
            {
                if (*it == item)
                {
                    return true;
                }
            }
            return false;
        }

        void insert(const T & item)
        {
            if (find(item))
            {
                return;
            }

            int index = hash(item);
            table[index].push_front(item);
            numElements++;
        }
};

#endif  // Hash_H