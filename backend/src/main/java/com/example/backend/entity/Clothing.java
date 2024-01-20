package com.example.backend.entity;

import jakarta.persistence.*;
import org.hibernate.engine.jdbc.Size;

import java.awt.*;
import java.util.List;


@Entity
@Table(name = "clothing")
public class Clothing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(nullable = false)
    private String type;
    @ElementCollection
    @CollectionTable(name = "clothing_size", joinColumns = @JoinColumn(name = "clothing_id"))
    @Column(name = "size")
    private List<String> size;
    @ElementCollection
    @CollectionTable(name = "clothing_color", joinColumns = @JoinColumn(name = "clothing_id"))
    @Column(name = "color")
    private List<String> color;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Boolean inStock = true;
    @Column(nullable = true)
    private String imagePath;

    // Constructors, getters, and setters

    // Enum representing the category
    public enum Category {
        Male, Female, Unisex, Other
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<String> getSize() {
        return size;
    }

    public void setSize(List<String> size) {
        this.size = size;
    }

    public List<String> getColor() {
        return color;
    }

    public void setColor(List<String> color) {
        this.color = color;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getInStock() {
        return inStock;
    }

    public void setInStock(Boolean inStock) {
        this.inStock = inStock;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}